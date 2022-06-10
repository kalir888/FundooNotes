const amqp = require('amqplib/callback_api');

export const server = (userData) => {
    amqp.connect('amqp://localhost', function(error0, connection) {
        if(error0) {
            throw error0;
        }
        connection.createChannel(function(error1, channel) {
            if(error1) {
                throw error1;
            }

            let queue = 'hello';
            let msg = JSON.stringify(userData);

            channel.assertQueue(queue, {
                durable: false
            });
            channel.sendToQueue(queue, Buffer.from(msg));

            console.log(" [x] Sent %s", msg);
        });
    });
    rec();
}

const rec = () => {
    amqp.connect('amqp://localhost', function(error0, connection) {
        if(error0) {
            throw error0;
        }
        connection.createChannel(function(error1, channel) {
            if(error1) {
                throw error1;
            }

            var queue = 'hello';

            channel.assertQueue(queue, {
                durable: false
            });

            console.log(" [*] Waiting for messages in %s, To exit press CTRL+C", queue);

            channel.consume(queue, function(msg) {
                console.log(" [x] Received %s", msg.content.toString());
            }, {
                noAck: true
            });
        });
    });
}