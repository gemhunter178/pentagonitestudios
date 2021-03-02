---
description: same as the typo algo above but allows some control of level of typos made if the sentence starts with "run[number]", up to 6.
variables:
  - text
  - words
  - iptNum
  - firstWord
tag: functions
order: 2
---
var iptNum = 1;
var firstWord = text.replace(/ .*/,'');
if(firstWord.replace(/[0-9]/g,'')=="num"){
	let value = firstWord.match(/\d+$/);
	if(value){
		iptNum = parseInt(value);
		if(isNaN(iptNum)){
			iptNum=1;
		}
		text = text.substr(text.indexOf(" ") + 1);
	}
}

if(text.length==0){
	text="You gotta enter a sentence to typo, silly!";
} else if(/^help$|^\\?$|^info$/.test(text)){
	text="Gem's typo v1! allows even more cursed typos if you start with run[num]";
	iptNum=0;
}

if(iptNum>6||iptNum<0){
	iptNum = 6;
}

var words = text.split(' ');
for(i=0;i<words.length;i++){
	let ltrs = words[i].split('');
	for(j=1;j<ltrs.length-1;j++){
		if(Math.random()<(0.15*iptNum)){
			if(Math.random()<0.7){
				tmp=ltrs[j];
				ltrs[j]=ltrs[j+1];
				ltrs[j+1]=tmp;
				j++;
			}else{
				ltrs[j]+=ltrs[j];
			}
		}
	}
	words[i]=ltrs.join('');
}
text=words.join(' ');