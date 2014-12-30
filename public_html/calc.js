var totalWeight = 0;
var price = 0;
var carFee = 0;
var sackCount = 0;
var feePerSack = 0;
var percentPerSack = 0;

function initialize(){
    var selectedIndex = document.querySelector('post-card-2').selection;
    var riceValue;
    switch(selectedIndex){
                case "1":
                    riceValue = document.querySelector('post-card-1').value1;
                    break;
                case "2":
                    riceValue = document.querySelector('post-card-1').value2;
                     break;
                case "3":
                    riceValue = document.querySelector('post-card-1').value3;
                    break;
                case "4":
                    riceValue = document.querySelector('post-card-1').value4;
                    break;
                case "5":
                    riceValue = document.querySelector('post-card-1').value5;
                    break;
                default :
                    alert(selectedIndex);
                    break;    
    }
    totalWeight = document.querySelector('post-card-3').weight;
    if(totalWeight.indexOf('+') != -1){
        var arrayWeight = totalWeight.split("+");
        var arrayLength = arrayWeight.length;
        var sumWeight = 0;
        for(var i=0 ;i< arrayLength; i++){
            sumWeight += parseInt(arrayWeight[i]);
        }
        totalWeight = sumWeight;
    }
    
    var carFeeIndex = document.querySelector('post-card-3').select; //get fee index
    var calcFormatIndex = document.querySelector('post-card-4').select; //get calculation format index

    var decreaseWeightPercent = parseFloat(document.querySelector('post-card-4').percent)/100;
    
    if(carFeeIndex == 1){
        sackCount = 0;
        feePerSack = 0;
        percentPerSack = 0;
        price = riceValue;
        carFee = 0;
    }else if(carFeeIndex == 2){
        price = riceValue - 2;
        sackCount = document.querySelector('post-card-3').sackCount;
        feePerSack = parseFloat(document.querySelector('post-card-3').feePerSack);
        percentPerSack = parseFloat(document.querySelector('post-card-3').percentPerSack);
        carFee = parseInt((percentPerSack*sackCount)+ (sackCount * feePerSack));
    }
    
    //ถ้าเป็นกก.บอกว่าคูณเท่าไหร่ (นน. * ราคา)
        if(calcFormatIndex == 1){
            price = price * 0.075 * parseInt(totalWeight);    
        }else if(calcFormatIndex == 2){
            price = (parseInt(totalWeight)*(1-decreaseWeightPercent)*price)/12;
        }
        var fee = sackCount * feePerSack;
        
        var output;
        if(carFeeIndex == 1 && calcFormatIndex == 1){
            output = "จ่ายค่าข้าว ( "+totalWeight+" กก. X " + riceValue*0.075 + " บาท) = <b><u>"+  parseFloat(price-(fee)).toFixed(2) + " บาท</u></b>";
        }else if(carFeeIndex == 1 && calcFormatIndex == 2){
            output = "จ่ายค่าข้าว [( "+totalWeight+" กก. - "+ parseFloat(decreaseWeightPercent*totalWeight).toFixed(2) + " กก.) หาร 12 ] X "+ riceValue + " = <b><u>" + parseFloat(price).toFixed(2) + " บาท</u></b>"; 
        }else if(carFeeIndex == 2 && calcFormatIndex == 1){
            output = "จ่ายค่าข้าว ( "+totalWeight+" กก. X " + parseFloat((riceValue-2)*0.075).toFixed(2) + " บาท) - ค่ารถ "+ fee +" บาท = <b><u>"+  parseFloat(price-(fee)).toFixed(2) + " บาท </u></b><br />"+"จ่ายค่ารถ " + fee + " บาท + " + "เปอร์เซ็นต์ "+ (sackCount*percentPerSack) +" บาท = <b><u>" + carFee +" บาท</u></b>\n";
        }else if(carFeeIndex == 2 && calcFormatIndex == 2){
            output = "จ่ายค่าข้าว [( "+totalWeight+" กก. - "+ parseFloat(decreaseWeightPercent*totalWeight).toFixed(2) + " กก.) หาร 12 ] X "+ (riceValue-2) + " บาท " + "- ค่ารถ "+ fee +" บาท = <b><u>" + parseFloat(price-fee).toFixed(2) + " บาท </u></b><br />"+"จ่ายค่ารถ " + fee + " บาท + " + "เปอร์เซ็นต์ "+ (sackCount*percentPerSack) +" บาท = <b><u>" + carFee +" บาท</u></b>\n";
        }
       
       var printOutput = $('#output').html(output);
}


