# Set the base image to Ubuntu
FROM ubuntu:latest

ENV TZ=Americas/Chicago
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

## for apt to be noninteractive
ENV DEBIAN_FRONTEND noninteractive
ENV DEBCONF_NONINTERACTIVE_SEEN true

# Install git and TF dependencies
RUN apt-get update && \
    apt-get install -y python3-pip python3-dev build-essential && \
    apt-get install -y tzdata \
    git \
    wget \
    cmake \
    python-dev

COPY requirements.txt /root/

RUN pip3 install -r /root/requirements.txt
RUN rm /root/requirements.txt


WORKDIR /root

CMD ["/bin/bash"]
