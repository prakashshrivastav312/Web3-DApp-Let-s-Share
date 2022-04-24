App = {
  loading: false,
  contracts: {},  
  init: async () => {
    await App.loadWeb3()
    await App.loadAccount()
    await App.loadContract()
    await App.render()
  },
  load1: async () => {
   
    await App.loadWeb3()
    await App.loadAccount()
    

    await App.loadContract1()
    
    await App.loadContract2()
    await App.render1()
    

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
  loadContract2: async () => {
    // Create a JavaScript version of the smart contract
    const PST = await $.getJSON('PST.json')
    App.contracts.PST = TruffleContract(PST)
    App.contracts.PST.setProvider(App.web3Provider)
    // Hydrate the smart contract with values from the blockchain
    App.pst = await App.contracts.PST.deployed()
  },
  render1:async() =>{
    $("#meta").html(App.account)
    $('#showpage').show()
  },

  render: async () => {
    $("#meta").html(App.account)
    var role= await App.student.roles(App.account)
    if(role == '1'){
      $('#showpages').hide();
      $('#DriverPage').hide();
      $('#Top').hide();
      $('#PassengerPage').show();
      await App.displayuser();
      
    }
    else if(role == '2'){
      $('#showpages').hide();
      $('#DriverPage').show();
      $('#Top').hide();
      $('#PassengerPage').hide();
      await App.displayuser();
    }
    else{
      $('#showpages').show();
      $('#DriverPage').hide();
      $('#PassengerPage').hide();
      $('#Top').show();
    }
  } ,

  displayuser:async()=>{
    var num=await App.student.num(App.account)
    // window.alert(num);
    var student= await App.student.user(parseInt(num));
    var str="<tr><td>"+student[0]+"</td><td>"+student[1]+"</td><td>"+student[2]+"</td><td>"+student[3]+"</td><td>"+student[4]+"</td><td>"+student[5]+"</td><td>"+student[6]+"</td></tr>"
    $('#displayuser').append(str);
    $('#displayuser1').append(str);
  },

  donate1:async()=>{

    
    var amount=parseInt($("#amount").val());
    
    await App.pst.transfer(App.crowd.address,amount,{from:App.account});

    // await App.crowd.donates({from:App.account,value:a.toString()});

   },
   balance: async()=>{
    var a=await App.pst.balanceOf(App.crowd.address);
    window.alert(a);
    // var bala=parseInt(a)/1000000000000000000;
    $("#disbalance").html(a);
  },
  signUP :async ()=>{    
    var uname=$("#username").val();  
    var email=$("#email").val();  
    var ph=$("#ph").val();  
    var ad=$("#ad").val();
    var rl=$("#role").val();
    var cn=$("#cn").val();
    var cm=$("#cm").val();
    await App.student.register(uname,email,ph,ad,rl,cn,cm, {from:App.account});
  } ,
   
  displayItems: async ()=>{
    
    $("#display").empty();
    var id=await App.student.id();
    var count=parseInt(id);
    for(var i=1;i<=count;i++){
      var student= await App.student.user(parseInt(i));
      var str="<tr><td>"+student[0]+"</td><td>"+student[1]+"</td><td>"+student[2]+"</td><td>"+student[3]+"</td><td>"+student[4]+"</td><td>"+student[5]+"</td><td>"+student[6]+"</td></tr>"
      $("#display").append(str);
    }
 
  },
  register: async ()=>{
    await App.crowd.register({from:App.account});
  },
  distribute: async()=>{
    await App.crowd.distribute({from:App.account});

  }
  
  
}


$(function() {
  $(window).load(function() {
    App.init();
  });
});
