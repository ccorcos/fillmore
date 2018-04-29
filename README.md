# Fillmore Calendar

It's always bothered me that [The Fillmore](http://thefillmore.com/calendar/) doesn't have a email list. There are so many amazing concerts there that I miss out on because I don't check the caledar every day. So I made this little script which will check the calendar and send an email if anything new pops up.

# Setup

Create a `config.ts` file with your gmail account detials and a list of emails you want to notify. Make sure you turn on ["Less secure mode"](https://support.google.com/accounts/answer/6010255?hl=en) for this gmail account in order for it to work. I have a designated gmail just for this kind of stuff.

```ts
export const from = `"Name" <XXX@gmail.com>`
export const replyTo = "XXX@example.com"
export const email = "XXX@gmail.com"
export const password = "XXX"
export const sendTo = ["XXX@example.com"]
```

Or you can just let me know you're email and I'll add you to my list.

## Commands

- `npm run once` runs the program once.
- `npm run logs` opens the log file in VSCode.
- `npm run json` opens up the latest json dump in VSCode.

## Setup Crontab

```
0 * * * * cd /Users/chet/Code/js/web-scaper && npm run once
```

This helped me: https://superuser.com/a/907889/310207
