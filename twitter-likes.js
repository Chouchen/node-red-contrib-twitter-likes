var Twit = require('twit');

module.exports = function(RED) {
    'use strict';

    function TwitterLikes(n) {
      
        RED.nodes.createNode(this,n);

        var node = this;
        
        node.on('input', function (msg) {
            
            var creds = RED.nodes.getNode(n.creds),
                payload = typeof msg.payload === 'object' ? msg.payload : {};
        
            var attrs = ['tweet'];
            for (var attr of attrs) {
                if (n[attr]) {
                    payload[attr] = n[attr];     
                }
            }
            
            payload.id = payload.tweet;

            var T = new Twit({
                consumer_key: creds.consumer_key,
                consumer_secret: creds.consumer_secret,
                access_token: creds.access_token_key,
                access_token_secret: creds.access_token_secret
            });

            T.get('favorites/list', {}, function(err, likedTweets, response) {
                msg.payload = likedTweets;
                node.send(msg);
            });
        });
    }

    RED.nodes.registerType('twitter-likes', TwitterLikes);
};
