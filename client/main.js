Items = new Meteor.Collection('items');
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

contractAddress="0x24652f6c6390917945e9a7c9d9d32e57c6b9dddb"
ABIArray=[{"constant":false,"inputs":[{"name":"fileHash","type":"bytes32"}],"name":"addRecord","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"fileHash1","type":"bytes32"}],"name":"IsIdInArray","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"fileHashes","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getRecord","outputs":[{"name":"","type":"bytes32[]"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"}]
mydata="6060604052341561000f57600080fd5b5b60006002819055505b5b610352806100296000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063571a1d731461005f5780635d0ab0251461009a578063c110f4c9146100d9578063f18ad6fb14610118575b600080fd5b341561006a57600080fd5b610084600480803560001916906020019091905050610183565b6040518082815260200191505060405180910390f35b34156100a557600080fd5b6100bf6004808035600019169060200190919050506101d4565b604051808215151515815260200191505060405180910390f35b34156100e457600080fd5b6100fa6004808035906020019091905050610239565b60405180826000191660001916815260200191505060405180910390f35b341561012357600080fd5b61012b61025e565b6040518080602001828103825283818151815260200191508051906020019060200280838360005b8381101561016f5780820151818401525b602081019050610153565b505050509050019250505060405180910390f35b600080805480600101828161019891906102c1565b916000526020600020900160005b849091909150906000191690555060026000815480929190600101919050555060016002540390505b919050565b600080600090505b60008054905081101561022e5782600019166000828154811015156101fd57fe5b906000526020600020900160005b50546000191614156102205760019150610233565b5b80806001019150506101dc565b600091505b50919050565b60008181548110151561024857fe5b906000526020600020900160005b915090505481565b6102666102ed565b60008054806020026020016040519081016040528092919081815260200182805480156102b657602002820191906000526020600020905b8154600019168152602001906001019080831161029e575b505050505090505b90565b8154818355818115116102e8578183600052602060002091820191016102e79190610301565b5b505050565b602060405190810160405280600081525090565b61032391905b8082111561031f576000816000905550600101610307565b5090565b905600a165627a7a72305820480e95eef0796cd163aa2b32080446b9fb437f4f140583b6ff44057ab8fdaced0029";
myContract = web3.eth.contract(ABIArray).at(contractAddress); 

Template.hello1.onCreated(function addVidstart() {            

  this.response4 = new ReactiveVar();
  this.response5 = new ReactiveVar();

});

Template.hello1.helpers({
  response4() {
    return Template.instance().response4.get();
  },
  response5() {
    return Template.instance().response5.get();
  },
});

Template.hello1.events({
  'click button'(event, instance) {

    // var template = Template.instance();
    var hash = document.getElementById('fileDisplayArea').value;
  
// console.log(web3.isConnected());

     myContract.addRecord(
 hash,function(err,address){
    if(document.getElementById('fileDisplayArea').value == ""){
        return instance.response5.set("please input a hash");
    }

 if(!err){
console.log(address);
instance.response4.set(address);
}
else if(err){
    instance.response5.set("not submited");

}
 });
  },
});

Template.hello2.onCreated(function addVidstart() {            
  this.response1 = new ReactiveVar();
  this.response2 = new ReactiveVar();

});

Template.hello2.helpers({
  response1() {
    return Template.instance().response1.get();
  },
  response2() {
    return Template.instance().response2.get();
  },
});


Template.hello2.events({
  'click button'(event, instance) {

    // var template = Template.instance();
    var hash1 = document.getElementById('fileDisplayArea1').value;
  
// console.log(web3.isConnected());

    myContract.IsIdInArray(
hash1,function(err,address){
     if(document.getElementById('fileDisplayArea1').value == ""){
        return instance.response1.set("please input a hash");
    }
else if(address == false){
     console.log(address);
     console.log('hiiii');
 instance.response2.set("hash is: "+ address);
  
}
else {
   console.log(address);
  instance.response2.set(address);
}
});

  },
});


Template.hello3.onCreated(function addVidstart() {            

  this.response3 = new ReactiveVar();

});

Template.hello3.helpers({
  response3() {
    return Template.instance().response3.get();
  },
});

Template.hello3.events({
  'click button'(event, instance) {
  
// console.log(web3.isConnected());

    myContract.getRecord(function(err,address){
if(!err)
console.log(address);
instance.response3.set(address);
});

  },
});

Template.hello4.onCreated(function addVidstart() {            

  this.response = new ReactiveVar();

});

Template.hello4.helpers({
  response() {
    return Template.instance().response.get();
  },
});


Template.hello4.events({
  'click button'(event, instance) {

        var fileInput = document.getElementById('fileInput');
        var fileDisplayArea = document.getElementById('fileDisplayArea');
        var abc = document.getElementById('abc');

        
            var file = fileInput.files[0];
            var textType = /.*/;
            var textType1 = /mp4.*/;
            var textType2 = /mkv.*/;
            

            if (file.type.match(textType)) {
                var reader = new FileReader();

                reader.onload = function(e) {
                    //fileDisplayArea.innerText = reader.result.toString();
                    fileDisplayArea.innerText =  web3.sha3(reader.result.toString(),true)
                    fileDisplayArea1.innerText =  web3.sha3(reader.result.toString(),true)
                    console.log(web3.sha3(reader.result.toString(),true));
                    instance.response.set(' hash generated-'+web3.sha3(reader.result.toString(),true));

                }

                reader.readAsText(file);    
            } else if(file.type.match(textType1)){
                 var reader = new FileReader();

                reader.onload = function(e) {
                    //fileDisplayArea.innerText = reader.result.toString();
                    fileDisplayArea.innerText =  web3.sha3(reader.result.toString(),true)
                    fileDisplayArea1.innerText =  web3.sha3(reader.result.toString(),true)
                }

                reader.readAsText(file); 
            }
            else if(file.type.match(textType2)){
                 var reader = new FileReader();

                reader.onload = function(e) {
                    //fileDisplayArea.innerText = reader.result.toString();
                    fileDisplayArea.innerText =  web3.sha3(reader.result.toString(),true)
                    fileDisplayArea1.innerText =  web3.sha3(reader.result.toString(),true)
                }

                reader.readAsText(file); 
               
            }
              else {
                fileDisplayArea.innerText = "File not supported!"
            }
       

 },
});
