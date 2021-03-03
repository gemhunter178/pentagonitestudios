/* Tell ESLint that there will be the following global variables */
/* global text:true */
var iptNum = 1;
if(text.length==0){
	text="You gotta enter a sentence to typo, silly!";
} else if(/^help$|^\\?$|^info$/.test(text)){
	text="Gem's typo v1! allows even more cursed typos if you start with typo[num], up to 10";
	iptNum=0;
} else {
	const rgex=/typo(\d+)\s/;
	let fndwrd = text.match(rgex);
	let pos = text.search(rgex);
	if(fndwrd!=null){
		iptNum=fndwrd[1];
		text = text.substr(0,pos)+text.substr(pos+fndwrd[0].length);
	} else if(text.match(/typo(\d+)/)) {
		text = "You can't just enter a typo level without a sentence!";
	}
}
	
var repeatNum = 0;
if(iptNum>10||iptNum<0){
	repeatNum = 4;
} else if(iptNum > 6){
	repeatNum = iptNum - 6;
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
		if(j>1 && Math.random()<(.025*repeatNum)){
			j--;
		}
	}
	words[i]=ltrs.join('');
}
text = words.join(' ');
