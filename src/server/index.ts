import * as parcel from "parcel-bundler"
import * as express from "express"
import * as path from "path"

const file = path.resolve(__dirname, "../client/index.html")
const bundler = new parcel(file)

const app = express()
app.use(bundler.middleware())
app.listen(8080)
