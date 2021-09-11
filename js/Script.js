
function Q1() 
{
    //saves input to variables
var name1= document.getElementById("playerOne").value;
var name2= document.getElementById("playerTwo").value;

//checks if only alphabets was inputted
CheckIfNameIsValid(name1);
CheckIfNameIsValid(name2);

alert(CheckIfGoodMatch(name1,name2,GetPercentageMatch(name1,name2)));


}

function CheckIfNameIsValid(nm1){
  //checks if only alphabets was inputted
    var reg = /^[a-zA-Z]*$/;
  if (reg.test(nm1)) {
     }else{
    throw alert('Only Alphabets are allowed in the name');
    
    }
}

//gets the percentage for the two names
function GetPercentageMatch(NameOne,NameTwo){

    //joins the two names together with matches
    var str = NameOne+"matches"+NameTwo
    str = str.replace(/\s+/g, "");
    
    var count = 0;
    var counter = "";
    
    //while loop repeats until string is empty
    while (str.length>0) {
    
    //checks if character equals another character in the string
        for (var i = 0; i < str.length; i++) {
            if (str[0]==str[i]){
                count++;
                     }      
         }
    //if no characters equal another then count is set to 1
            if (count ==0) {
                count =1;
            }
    //joins all counters in a string   
           counter = counter+count;
           count = 0;
    //removes all characters that was checked above from the string        
             var re = new RegExp(str[0],"g");
             str =  str.replace(re, "");
          
    }
    //varible declaration 
    var sum ="";
    var revCount;
    var middleNum;
    var counts = 0;

    
    while(counter.length>2){
       
         revCount = counter.length-1
         middleNum = 0;
    //checks if lenght of string is even or odd to get the middle number      
        if (((counter.length) % 2)==0) {
            middleNum = counter.length /2
        }else{
            middleNum = (counter.length-1) /2
        }
    
    for (var i = 0; i <middleNum; i++) {
    //add the first and last number 
        sum = sum+((parseInt(counter[i])+parseInt(counter[revCount-i])));
                
        }
    if (((counter.length) % 2)==1) {
    //inserts the middle number at the end if the length was odd
        sum = sum + counter[middleNum]
        }
      counter = (sum);
      sum ="";
      
      counts++;
    }
   //converts string to an Int
    return (parseInt(counter));
}

//Read csv file
function ReadCsv() 
{
    //gets the file uploaded
    var fileUpload = document.getElementById("uploadFile");
    var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
   
   //varible declaration 
    var TwoDArray ;
    var rows;
    var columns;
    var maleArray =[];
    var femaleArray = [];
    var sortedArray = [];
    var countM=0;
    var countF=0;

    
    //checks if file is a valid .csv file
    if (regex.test(fileUpload.value.toLowerCase())) {
        if (typeof (FileReader) != "undefined") {

    //reads .csv file
            var reader = new FileReader();
            reader.onload = function (e) {

     //splits file by rows          
                 rows = e.target.result.split('\n');
                TwoDArray = new Array(rows.length);
                 
                for (var i = 0; i < rows.length-1; i++) {
                    //splits the columns 
                    columns = rows[i].split(',');
                    TwoDArray[i] = new Array(columns.length);
              
                   
                      if (columns.length == 2) {
                        for (var j = 0; j < columns.length; j++) {
                                                   
                            TwoDArray[i] = columns;

                          //removes unnecessary characters
                            TwoDArray[i][j] = TwoDArray[i][j].replace('"',"");
                            TwoDArray[i][j] = TwoDArray[i][j].replace(/(\r\n|\n|\r)/gm,"");
                          
                            if (j==1) {
                                CheckIfNameIsValid(TwoDArray[i][0]);
                        //checks if Player is male or female
                                if (TwoDArray[i][j] =='m') {
                                    maleArray[countM] = new Array(columns.length);
                                    maleArray[countM][0] = TwoDArray[i][0];
                                    maleArray[countM][1] = TwoDArray[i][1];
                                   countM++;
                                }else
                                if (TwoDArray[i][j] =='f') {
                                    femaleArray[countF] = new Array(columns.length);
                                    femaleArray[countF][0] = TwoDArray[i][0];
                                    femaleArray[countF][1] = TwoDArray[i][1];
                                    countF++;
                                }else{
                                  throw alert('Please upload a valid CSV files');
                                }
                            }

                        }
                    }else{
                        throw alert('Please upload a valid CSV file');
                        
                    }
                }
        //removes duplicates from arrays
           maleArray = RemoveDuplicate(maleArray);
           femaleArray = RemoveDuplicate (femaleArray);
           

           var count =0;
           for (let m = 0; m < maleArray.length; m++) {
              for (let f = 0; f <  femaleArray.length; f++) {
        //checks every player in the first set against every player in the second set                
               sortedArray[count] =new Array(2);
               sortedArray[count][0] = CheckIfGoodMatch(maleArray[m][0],femaleArray[f][0],GetPercentageMatch(maleArray[m][0],femaleArray[f][0]));
               sortedArray[count][1] = GetPercentageMatch(maleArray[m][0],femaleArray[f][0])

               count++;
              }
               
           }

        //sorts array from highest percentage to lowest first  
           sortedArray =sortedArray.sort(function(a,b){ 
            
               if (a[1]<b[1]) {
                return 1;
               }else{
                return -1;
               }
                           
                 });    
        //sorts array with the same percentage in alphabetical order
           sortedArray =sortedArray.sort(function(a,b){
            if (a[1]==b[1]) {
                if (a[0]>b[0]) {
                    return 1;
                }else{
                    return -1;
                }
                 }else{
                return 0;
               }         
            });

         //calls the write to text file function 
           WritetoFile(sortedArray)
}
            reader.readAsText(fileUpload.files[0]);
        } else {
            throw  alert("This browser does not support HTML5.");
        }
    } else {
        throw  alert("Please upload a valid CSV file");
    }
}

//function to remove duplicates in a set
function RemoveDuplicate(TempArray){
    for (var i = 0; i < TempArray.length; i++) {
        for (var j = 0; j < TempArray.length; j++) {
             if (i!==j) {
               if (TempArray[i][0]==TempArray[j][0]) {
                   TempArray.splice(j,1)
               }
            } 
        }
     }
     return TempArray;
}

//returns string after checking if its a good match 
function CheckIfGoodMatch(nameM,nameF,perc){
   //checks if the percentage is greater than 80 and displays appropriate message
    var gMatch ='';
    if (perc>80) {
      gMatch = (nameM+' matches '+nameF+' '+ perc+'%, good match');
    }else{
        gMatch = (nameM+' matches '+nameF+' '+ perc+'%');
    }
    return gMatch;
}

//Insert array into textfile
function WritetoFile(matchStr){

var downText ="";
    //loop to insert elements into a string 
for (let i = 0; i < matchStr.length; i++) {
    downText = downText+ matchStr[i][0]+'\n';
    
}    
   //Insert string into a text file and is downloaded
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(downText));
    element.setAttribute('download','output.txt');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);


}
