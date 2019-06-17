const letter = ['К', 'Г', 'І', 'А', 2, 1, 4, 3];
const answer = ['кремниевый', 'германиевый', 'индиевый', 'арсенид-галиевый'];
const type = ['Т', 'Ц', 'П', 'Н', 'Д', 'У', 'С', 'Л', 'О', 'Г', 'А', 'В', 'И'];
const type_answer = ['биполярный', 'диодный мост', 'полевой', 'динистор', 'диод', 'триодный тиристор', 'стабилитрон', 'красный светодиод с рассеяным излучением', 'оптрон', 'генератор-шума', 'сверх-высоко-частотные диоды', 'варикап', 'туннельной'];

const diode_64 = ['низ.частот, низ.мощ', 'низ.частот, сред.мощ', 'низ.частот, мощ', 'сред.частот, мало.мощ', 'сред.частотый, сред.мощ', 'сред.частот, мощ', 'выс.частот, мало.мощ', 'выс.частот, сред.мощ', 'выс.частот, мощ'];
const tran_64 = ['мал.мощ, низ.частот', 'мал.мощ, сред.частот', 'мал.мощ, выс.частот', 'сред.мощ, низ.частот', 'сред.мощ, сред.частот', 'сред.мощ, выс.частот', 'мощ, низ.частот', 'мощ, сред.частот', 'мощ, выс.частот'];
const tran = ['германиевый транзистор, мал.мощ, низ.частот, < 0.25 Вт', 'кремниевый транзистор, мал.мощ, < 0.25 Вт', 'германиевый транзистор, низ.частот, мощ, > 0.25 Вт', 'кремниевый транзистор, мощ, низ.частот, > 0.25 Вт', 'транзистор, выс.частот, мал.мощ, > 5мгц, < 0.25 Вт', 'кремниевый транзистор, выс.частот, мал.мощ, > 5мгц, < 0.25 Вт', 'германиевый транзистор, выс.частот, мощ, > 5мгц, > 0.25 Вт', 'кремниевый транзистор, выс.частот, мощ, > 0.25 Вт'];


const Type = {
    TRANSISTOR: 0,
    DIODE: 1
};

main();

function main() {
    let wordless = prompt('Введите диод или транзистор (64+ или 64-):');

    if (wordless) {
        wordless = wordless.toUpperCase();
        const resultProcessing = process(wordless || '');

        console.log(wordless + resultProcessing);
        alert(wordless + resultProcessing);
    }
}

function process(item) {
    item = item.toUpperCase();
    const parsedItem = parseAll(item);

    const type = item[0] === 'М' || item[0] === 'П' || item[0] === 'Т' ?
        Type.TRANSISTOR :
        Type.DIODE;

    const isOlderThat64 = type === Type.TRANSISTOR ?
        item[0] === 'М' || item[0] === 'П' || item[0] === 'Т' :
        item[0] === 'Д';

    if (type === Type.TRANSISTOR && isOlderThat64) {
        return processTransistorBefore64(parsedItem);
    }

    if (type === Type.TRANSISTOR && !isOlderThat64) {
        return processTransistorAfter64(parsedItem);
    }

    if (type === Type.DIODE && isOlderThat64) {
        return processDiodeBefore64(parsedItem);
    }

    if (type === Type.DIODE && !isOlderThat64) {
        return processDiodeAfter64(parsedItem);
    }
}

function processDiodeAfter64(item) {
    const result = ['диод, 64+'];

    return input(item.join(''));
}

function processDiodeBefore64(item) {
    const result = [' – диод, 64-'];
    const number = item[1];
    const letter = item[2];

    if (0 < number && number <= 100) {
        result.push('точечный германиевый');
    }

    if (100 < number && number <= 200) {
        result.push('точечный кремниевый');
    }

    if (200 < number && number <= 300) {
        result.push('плоскостный кремниевый');
    }

    if (300 < number && number <= 400) {
        result.push('плоскостный германиевый');
    }

    if (400 < number && number <= 500) {
        result.push('сместительный СВЧ детектор');
    }

    if (500 < number && number <= 600) {
        result.push('умножительный диод');
    }

    if (600 < number && number <= 700) {
        result.push('видеодетектор');
    }

    if (700 < number && number <= 749) {
        result.push('параметрический германиевый');
    }

    if (749 < number && number <= 800) {
        result.push('параметрический кремниевый');
    }

    if (800 < number && number <= 900) {
        result.push('стабилитрон');
    }

    if (900 < number && number <= 950) {
        result.push('варикап');
    }

    if (950 < number && number <= 1000) {
        result.push('тунельный');
    }

    if (1000 < number && number <= 1100) {
        result.push('выпрямытельных столбов');
    }

    if (letter) {
        if (letter === 'С') {
            result.push('стабилитрон');
        } else {
            result.push('модификация ' + letter);
        }
    }

    return result.join(', ');
}

function processTransistorAfter64(item) {
    const result = ['транзистор, 64+'];

    return input(item.join(''));
}

function processTransistorBefore64(item) {
    const result = [' – транзистор, 64-'];
    const material = item[0];
    const number = item[1];

    if (material[0] === 'М') {
        result.push('сварной корпус');
    }

    if (0 < number && number <= 100) {
        result.push('германиевый маломощный низкой частоты');
    }

    if (100 < number && number <= 200) {
        result.push('кремниевый маломощный низкой частоты');
    }

    if (200 < number && number <= 300) {
        result.push('германиевый мощный низкой частоты');
    }

    if (300 < number && number <= 400) {
        result.push('кремниевый мощный низкой частоты');
    }

    if (400 < number && number <= 500) {
        result.push('германиевый маломощный высокой и сверхвысокой частоты');
    }

    if (500 < number && number <= 600) {
        result.push('кремниевый маломощный высокой и сверхвысокой частоты');
    }

    if (600 < number && number <= 700) {
        result.push('германиевый мощный высокой и сверхвысокой частоты');
    }

    if (700 < number && number <= 799) {
        result.push('кремниевый мощный высокой и сверхвысокой частоты');
    }

    return result.join(', ');
}


function input(word) {
    const t_64_min = word[0] === 'М' || word[0] === 'П';
    if (word.length >= 5 && !t_64_min) {
        return in_six(word)
    } else if (!t_64_min) {
        return 'error'
    }

    if (t_64_min) {
        return in_m(word)
    } else {
        return 'error M'
    }
}

function in_six(word) {
    let j;
    let result = ' – 64+, ';

    for (j = 0; j < letter.length; j++) {
        if (word[0] === letter[j]) {
            result += answer[j % 4] + ' '
        }
    }

    for (j = 0; j < type.length; j++) {
        if (word[1] === type[j])
            result += type_answer[j]
    }


    if (word[1] !== 'П' && word[1] !== 'Т') {
        for (j = 1; j < 10; j++) {
            if (word[2] === j)
                result += ', ' + diode_64[j - 1]
        }
    } else {
        for (j = 1; j < 10; j++) {
            if (word[2] === j)
                result += ', ' + tran_64[j - 1]
        }
    }


    result += ', модель ' + word[3] + word[4] + ', мод ' + word[5];

    return result;
}

function in_m(word) {
    let corp;
    let start_counter = 0;
    let num;

    let result = ' – 64-, ';

    if (word[0] === 'М') {
        corp = true;
        start_counter = 1
    }

    num = '' + word[start_counter + 1] + word[start_counter + 2] + word[start_counter + 3];

    let i = 100, j = 0, r = 0, stop = true;
    for (; stop; i += 100, j = i - 99) {
        if (num > j && num < i) {
            result += tran[r];
            stop = false;
        }
        if (r > 10) {
            stop = false;
        }
        r++;
    }
    result += ', мод ' + word[start_counter + 4];
    if (corp) {
        result += ', сварной корпус';
    }

    return result;
}

function parseAll(string) {
    const result = [];

    while (string.length !== 0) {
        const parsedNumber = parseInt(string);
        const parsedString = parseStr(string);
        const currentItem = parsedNumber || parsedString;

        if (!currentItem) {
            new Error('Cannot parse: ' + string);
            break;
        }

        result.push(currentItem);
        string = string.slice(String(currentItem).length, string.length);
    }

    return result;
}

function parseStr(string, count) {
    if (count) {
        return string.slice(0, count);
    }

    count = 0;
    for (let i = 0, n = string.length; i < n; i++) {
        if (!+string[i]) count++;
        else break;
    }
    return string.slice(0, count);
}

function generate() {
    const arr = [];

    const n = prompt();
    for (let i = 0; i < n; i++) {
        arr.push(prompt());
    }

    console.log(arr);
}
