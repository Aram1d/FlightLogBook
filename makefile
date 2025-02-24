# Define variables
BUILD_DIR = ./build
CLIENT_BUILD_DIR = ./client/build
SERVER_SRC = ./src/index.ts
OUTFILE = main
DEST = flb

# Default target
all: prepare_build client_build server_build copy_env

# Create .build directory and clean up previous build
prepare_build: clean
	@mkdir -p $(BUILD_DIR)

dl_deps:
	@cd ./client && bun install
	@cd ./server && bun install

# Build the client and move the output
client_build:
	@cd ./client && bun run build && mv ./dist ../build/public

# Build the server
server_build:
	@cd ./server && bun build --compile $(SERVER_SRC) -e mock-aws-s3 -e nock -e aws-sdk --outfile ../build/$(OUTFILE)

# Copy the environment file
copy_env:
	@cp ./server/.env $(BUILD_DIR)/.env

# Install target: Copies build files to /var/www/$(DEST) and changes ownership to www-data
install:
	@if [ -z "$(DEST)" ]; then echo "Error: DEST argument is required, usage: make install ARG=<path>"; exit 1; fi
	@sudo systemctl stop flb
	@sudo mkdir -p /var/www/$(DEST)
	@sudo cp -r $(BUILD_DIR)/* /var/www/$(DEST)
	@sudo chown -R www-data:www-data /var/www/$(DEST)
	@echo "Installed build to /var/www/$(DEST)"
	@sudo systemctl start flb

# Uninstall target: Removes files from /var/www/$(DEST)
uninstall:
	@if [ -z "$(DEST)" ]; then echo "Error: DEST argument is required, usage: make uninstall ARG=<path>"; exit 1; fi
	@if [ -d /var/www/$(DEST) ]; then \
		sudo rm -rf /var/www/$(DEST); \
		echo "Uninstalled build from /var/www/$(DEST)"; \
	else \
		echo "Error: Directory /var/www/$(DEST) does not exist."; \
	fi

# Clean target
clean:
	@rm -rf $(BUILD_DIR)
	@echo "Cleaned build directory"

# PHONY prevents conflicts with files of the same name as targets
.PHONY: all prepare_build client_build server_build copy_env install uninstall clean