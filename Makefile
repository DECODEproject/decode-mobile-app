.SILENT:
.PHONY: test


volumes =
interactive =
ifndef ci
	volumes = -v $(shell pwd):/code -v /code/node_modules
	interactive = -ti
endif

define d-run
	docker run $(interactive) --rm
endef


build:
	docker build -t wallet .


lint:
	$(d-run) \
		$(volumes) \
		wallet \
		npm run lint

test:
	$(d-run) \
		$(volumes) \
		wallet \
		npm run test

test/watch:
	$(d-run) \
		$(volumes) \
		wallet \
		npm run test-watch
