import * as puppeteer from "puppeteer"
import * as _ from "lodash"
import * as fs from "fs-extra"
import * as moment from "moment"
import * as markdownIt from "markdown-it"
import * as nodemailer from "nodemailer"

const sendTo = ["ccorcos@gmail.com"]
const email = "chets.robot@gmail.com"
const password = "chethasarobot"
const filePath = "/tmp/fillmore-scraper.json"

interface Item {
	link: string
	title: string
	content: string
	tickets?: string
}

interface Blob {
	time: string
	items: Array<Item>
}

async function main() {
	console.log("Running", moment().format("LLL"))
	const browser = await puppeteer.launch()
	const page = await browser.newPage()
	await page.goto("http://thefillmore.com/calendar/")

	const allItems: Array<Item | undefined> = await page.evaluate(() => {
		const items = document.querySelectorAll(".faq_main.calendar")
		const elements = Array.from(items)
		const results = elements.map(element => {
			const titleElm = element.querySelector(".title a") as
				| HTMLAnchorElement
				| undefined
			const contentElm = element.querySelector(".content") as
				| HTMLDivElement
				| undefined
			const ticketsElm = element.querySelector(".content .buy_ticket_link") as
				| HTMLAnchorElement
				| undefined
			if (titleElm && contentElm) {
				const link = titleElm.href
				const title = titleElm.innerText
				const content = contentElm.innerText
				const tickets = ticketsElm && ticketsElm.href
				return { link, title, content, tickets }
			}
		})
		return results
	})

	const results = _.compact(allItems)

	console.log("Found", results.length, "items.")

	if (await fs.pathExists(filePath)) {
		const contents = await fs.readFile(filePath, "utf-8")
		const blob: Blob = JSON.parse(contents)
		const newItems: Array<Item> = _.differenceWith(
			results,
			blob.items,
			_.isEqual
		)

		console.log("Found", newItems.length, "new items")

		if (newItems.length > 0) {
			const markdownText = newItems
				.map(item => {
					return [
						`**${item.title}** \\`,
						`[Tickets](${item.tickets}) \\`,
						item.content.split("\n").join(" \\\n"),
					].join("\n")
				})
				.join("\n\n")
			const md = markdownIt()
			const html = md.render(markdownText)

			// Send email
			const transporter = nodemailer.createTransport(
				`smtps://${email}:${password}@smtp.gmail.com`
			)

			const mailOptions = {
				from: `"Chet's Robot" <chets.robot@gmail.com>`,
				to: sendTo.join(", "),
				subject: "New Fillmore Events!",
				text: markdownText,
				html: html,
			}

			const info = await new Promise<nodemailer.SendMailOptions>(
				(resolve, reject) => {
					transporter.sendMail(mailOptions, (error, info) => {
						if (error) {
							return reject(error)
						} else {
							resolve(info)
						}
					})
				}
			)

			console.log("Sent email to ", sendTo.join(", "))
		}
	}

	console.log("Writing", filePath)
	await fs.writeFile(
		filePath,
		JSON.stringify(
			{ time: moment().format("LLL"), items: results },
			undefined,
			2
		),
		"utf-8"
	)

	console.log("Done")
	await browser.close()
}

main()
