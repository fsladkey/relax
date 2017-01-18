const path = require('path')
const repl = require("repl")
const resources = require("../core")

const newRepl = repl.start("node::jails> ")

newRepl.context.from = resources.from
newRepl.context.resources = resources
