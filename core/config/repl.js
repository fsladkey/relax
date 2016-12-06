const path = require('path')
const repl = require("repl")
const from = require("../core").from

const newRepl = repl.start("node::jails> ")

newRepl.context.from = from
