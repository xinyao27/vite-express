FROM oven/bun:latest

COPY compile.sh /compile.sh
RUN chmod +x /compile.sh

# Install dependencies and customize sandbox
WORKDIR /home/user

COPY . /home/user

RUN bun install
