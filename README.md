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

## Setup Launchd

Create the file `~/Library/LaunchAgents/com.fillmore.daemon.plist` with the contents below. (You will need to edit the paths to point to this directory).

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
	<dict>

		<key>Label</key>
		<string>com.fillmore.daemon.plist</string>

		<key>RunAtLoad</key>
		<true/>

		<key>StartInterval</key>
		<integer>600</integer>

		<key>StandardErrorPath</key>
		<string>/Users/chet/Code/js/fillmore-calendar/stderr.log</string>

		<key>StandardOutPath</key>
		<string>/Users/chet/Code/js/fillmore-calendar/stdout.log</string>

		<key>EnvironmentVariables</key>
		<dict>
			<key>PATH</key>
			<string><![CDATA[/usr/local/bin:/usr/local/sbin:/usr/bin:/bin:/usr/sbin:/sbin]]></string>
		</dict>

		<key>WorkingDirectory</key>
		<string>/Users/chet/Code/js/fillmore-calendar</string>

		<key>ProgramArguments</key>
		<array>
			<string>/usr/local/bin/npm</string>
			<string>run</string>
			<string>once</string>
		</array>

	</dict>
</plist>
```

Open up the `Console.app` and look at the `system.log` in case there are errors.

Start the daemon.

```sh
launchctl load ~/Library/LaunchAgents/com.fillmore.daemon.plist
```

## Resources

- https://developer.apple.com/library/content/documentation/MacOSX/Conceptual/BPSystemStartup/Chapters/CreatingLaunchdJobs.html
