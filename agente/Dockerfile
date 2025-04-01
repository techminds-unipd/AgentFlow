FROM docker.io/python:3.13.0-alpine3.20
WORKDIR /usr/src/app
COPY requirements.txt ./
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt
COPY ./src/ ./src/
COPY ./.env ./.env
EXPOSE 5000
WORKDIR /usr/src/app/src
CMD ["flask", "run", "--host=0.0.0.0"]