module.exports = function(RED) {
    function RemoteServerNode(n) {
        RED.nodes.createNode(this,n);
        this.consumer_key = n.consumer_key;
        this.consumer_secret = n.consumer_secret;
        this.access_token_key = n.access_token_key;
        this.access_token_secret = n.access_token_secret;
    }
    RED.nodes.registerType("twitter-likes-client", RemoteServerNode);
}