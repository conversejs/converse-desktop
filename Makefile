BIN ?= ./node_modules/.bin/
ESLINT	?= ./node_modules/.bin/eslint

clean:
	npm run clean

node_modules: package.json package-lock.json
	npm i

build: node_modules
	$(BIN)/electron-rebuild

serve: build
	npm start

.PHONY: eslint
eslint: node_modules
	$(ESLINT) *.js
	$(ESLINT) app/**/*.js
