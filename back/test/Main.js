const Main = artifacts.require('Main');

contract('Main', async function(){
    it('should initialize correctly', async function() {
        let instance = await Main.deployed();
        let message = await instance.getMessage();
        assert(message  === 'Hello World !'
            , 'Message is not initialized correctly');
    })
    it('should set the message correctly', async function() {
        let instance = await Main.deployed();
        await instance.setMessage('Julien');
        let message = await instance.getMessage();
        assert(message  === 'Hello Julien !'
            , 'Message is not set correctly');
    })
})