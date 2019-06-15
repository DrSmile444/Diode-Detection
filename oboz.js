var wordless = prompt("Введите диод:");
//generate();

var letter = ["К","Г","І","А",2,1,4,3];
var answer = ["кремниевый","германиевый","индиевый","арсенид-галиевый"];
var type = ["Т", "Ц", "П", "Н", "Д", "У", "С", "Л", "О", "Г", "А", "В"];
var type_answer = ["биполярный", "диодный мост", "полевой", "динистор", "диод", "триодный тиристор", "стабилитрон", "светодиод", "оптрон", "генератор-шума", "сверх-высоко-частотные диоды", "варикап"];

var doid_64 = ["низ.частот, низ.мощ", "низ.частот, сред.мощ", "низ.частот, мощ", "сред.частот, мало.мощ", "сред.частотый, сред.мощ", "сред.частот, мощ", "выс.частот, мало.мощ", "выс.частот, сред.мощ", "выс.частот, мощ"]
var tran_64 = ["мал.мощ, низ.частот", "мал.мощ, сред.частот", "мал.мощ, выс.частот", "сред.мощ, низ.частот", "сред.мощ, сред.частот", "сред.мощ, выс.частот", "мощ, низ.частот", "мощ, сред.частот", "мощ, выс.частот"]
var tran = ["германиевый транзистор, мал.мощ, низ.частот, < 0.25 Вт", "кремниевый транзистор, мал.мощ, < 0.25 Вт","германиевый транзистор, низ.частот, мощ, > 0.25 Вт","кремниевый транзистор, мощ, низ.частот, > 0.25 Вт", "транзистор, выс.частот, мал.мощ, > 5мгц, < 0.25 Вт", "кремниевый транзистор, выс.частот, мал.мощ, > 5мгц, < 0.25 Вт", "германиевый транзистор, выс.частот, мощ, > 5мгц, > 0.25 Вт", "кремниевый транзистор, выс.частот, мощ, > 0.25 Вт"];

var result = "";
var n = letter.length;

var final = input(wordless);

alert(final);
//console.log(final);
//alert(input(wordless));
function input(word) {
	//console.log(word);
	var t_64_min = word[0] == 'М' || word[0] == 'П';
	if (word.length >= 5 && !t_64_min) {
		return in_six(word)
	}	else if (!t_64_min) {
		return "error"
	}

	if (t_64_min) {
		return in_m(word)
	}	else {
		return "error M"
	}

	if (word[1] == "Л") {
		console.log(" – красный светодиод с рассеянным излучением")
	}
}

function in_six(word) {
	result = " – 64+, ";

	for (var j = 0; j < n; j++) {
		if (word[0] == letter[j]) {
			result += answer[j%4]+" "
		}
	}

	for (var j = 0; j < type.length; j++) {
		if (word[1] == type[j])
			result += type_answer[j]
	}



	if (word[1] != "П" && word[1]!= "Т") {
		for (var j = 1; j < 10; j++) {
			if (word[2] == j)
				result += ", "+doid_64[j-1]
		}
	}

	else {
		for (var j = 1; j < 10; j++) {
			if (word[2] == j)
				result += ", "+tran_64[j-1]
		}
	} 



	result += ", модель "+word[3]+word[4]+", мод "+word[5];

	return result;
}

function in_m(word) {
	var corp;
	var start_counter = 0;
	var num;
	var r;

	result = " – 64-, ";

	if (word[0] == 'М') {
		corp = true;
		start_counter = 1
	}

	num = ""+word[start_counter+1]+word[start_counter+2]+word[start_counter+3];

	for(var i = 100, j = 0, r = 0, stop = true; stop; i +=100, j = i-99) {
		if (num > j && num < i) {
			result += tran[r];
			stop = false;
		}
		if (r > 10) {
			stop = false;
		}
		r++;
	}
	result += ", мод "+word[start_counter+4];
	if (corp) {
		result += ", сварной корпус";
	}

	return result;
}

function generate() {
	var arr = [];

	for (var i = 0, n = prompt(); i < n; i++) {
	arr.push(prompt());
	}

	console.log(arr);
}
