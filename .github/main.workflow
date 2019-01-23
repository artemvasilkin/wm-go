workflow "New workflow" {
  on = "push"
  resolves = ["deploy"]
}

action "deploy" {
  uses = "./deploy"
  env = {
    MY_NAME = "Mona"
  }
  args = "\"deploy, I'm $MY_NAME!\""
}