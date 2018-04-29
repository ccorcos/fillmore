console.log(
	`
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
	<dict>
	    <key>Label</key>
	    <string>fillmore-calendar.application</string>

	    <key>WorkingDirectory</key>
	    <string>${__dirname}</string>

	    <key>ProgramArguments</key>
	    <array>
	        <string>/usr/local/bin/npm</string>
					<string>run</string>
					<string>once</string>
	    </array>

	    <key>RunAtLoad</key>
	    <true/>

	    <key>StartInterval</key>
			<integer>600</integer>

	    <key>KeepAlive</key>
	    <true/>

	</dict>
</plist>
`.trim()
)
