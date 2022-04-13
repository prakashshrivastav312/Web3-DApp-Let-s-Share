App = {
  loading: false,
  contracts: {},  
  load: async () => {
    await App.loadWeb3()
    await App.loadAccount()
    await App.loadContract()
    await App.render()
  },
  load1: async () => {
   
    await App.loadWeb3()
    await App.loadAccount()
    

    await App.loadContract1()
    

    await App.render()
    

  },


  // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
  loadWeb3: async () => {
    //var Web3 = require('web3')  ;  
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider
      web3 = new Web3(web3.currentProvider)
    } else {

      //web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));

      window.alert("Please connect to Metamask.")
    }
    // Modern dapp browsers...
    if (window.ethereum) {
      window.web3 = new Web3(ethereum)
      try {
        // Request account access if needed
        App.acc=await ethereum.enable()
        // Acccounts now exposed
        web3.eth.sendTransaction({/* ... */})
      } catch (error) {
        // User denied account access...
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = web3.currentProvider
      window.web3 = new Web3(web3.currentProvider)
      // Acccounts always exposed
      web3.eth.sendTransaction({/* ... */})
    }
    // Non-dapp browsers...
    else {
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  },

  loadAccount: async () => {
    // Set the current blockchain account
    App.account = App.acc[0];  
    //window.alert(App.account);
   
  },
  loadContract: async () => {
    // Create a JavaScript version of the smart contract
    const Sample = await $.getJSON('User.json')
    App.contracts.Sample = TruffleContract(Sample)
    App.contracts.Sample.setProvider(App.web3Provider)
    // Hydrate the smart contract with values from the blockchain
    App.student = await App.contracts.Sample.deployed()
  },
  loadContract1: async () => {
    // Create a JavaScript version of the smart contract
    const Crowd = await $.getJSON('Donate.json')
    App.contracts.Crowd = TruffleContract(Crowd)
    App.contracts.Crowd.setProvider(App.web3Provider)
    // Hydrate the smart contract with values from the blockchain
    App.crowd = await App.contracts.Crowd.deployed()
  },

  render: async () => {
    $("#meta").html(App.account)
    $("#showpage").show();
  } ,
  donate1:async()=>{

    
    var amount=parseInt($("#amount").val());
    var a=amount*1000000000000000000;

    await App.crowd.donates({from:App.account,value:a});

   },
   balance: async()=>{
    var a=await App.crowd.total();
    var bala=parseInt(a)/10000000000000000000;
    $("#disbalance").html(bala);
  },
  signUP :async ()=>{    
    var uname=$("#username").val();  
    var email=$("#email").val();  
    var ph=$("#ph").val();  
    var ad=$("#ad").val();
    var cn=$("#cn").val();
    var cm=$("#cm").val();
    await App.student.register(uname,email,ph,ad,cn,cm, {from:App.account});
  } ,
   
  displayItems: async ()=>{
    
   var name=await App.student.username();
   $('#name1').html(name);
   var email=await App.student.email();
   $('#email1').html(email);
   var phone=await App.student.phone();
   $('#phone1').html(phone);
   var addr=await App.student.addr();
   $('#addr1').html(addr);
   var cn=await App.student.carnum();
   $('#carn').html(cn);
   var cm=await App.student.carmod();
   $('#carm').html(cm);
   
 
  }
  
}

