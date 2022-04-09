BIN ?= ./node_modules/.bin/
ESLINT	?= ./node_modules/.bin/eslint

clean:
	npm run clean

node_modules: package.json package-lock.json
	npm i

serve: node_modules
	npm start

dist: node_modules
	npm dist

.PHONY: eslint
eslint: node_modules
	$(ESLINT) *.js
	$(ESLINT) app/**/*.js
