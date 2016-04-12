(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _questions = require('./questions');

var _questions2 = _interopRequireDefault(_questions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log(_questions2.default);
class Machine {
    constructor() {
        this.question_html = $('#question-para');
        this.answer_html = $('#answer-para');
        this.question_n = _questions2.default.length;
        this.state = 0;
    }

    refresh_question() {
        let a = [];
        console.log(a);
        const rd = Math.floor(Math.random() * this.question_n);
        this.question = _questions2.default[rd];
        this.question_html.text(this.question.question);
        this.answer_html.text('');
    }

    show_answer() {
        this.answer_html.text(this.question.answer);
    }

    next() {
        if (!this.state) {
            this.state = 1;
            this.show_answer();
        } else {
            this.state = 0;
            this.refresh_question();
        }
    }

    init() {
        this.refresh_question();
        $('body').click(() => this.next());
    }
}

const machine = new Machine();
machine.init();

},{"./questions":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
let questions = [{
    question: '西鄉的肖像是由哪個版畫家所做，跟據哪兩人的相貌繪製而成？',
    answer: `由義大利版畫家 Edoardo Chiossone, 跟據其弟西鄉從道和其堂弟大山巖繪製而成。`,
    level: 3
}, {
    question: '西鄉出生於？',
    answer: `薩摩國鹿兒島`,
    level: 3
}, {
    question: '西鄉之父、弟、堂第分別為？',
    answer: `西鄉吉兵衛、西鄉從道和大山巖。`,
    level: 3
}, {
    question: '西鄉號？日人多尊之為何？',
    answer: '號南州、日人多尊之為大西鄉、南州翁',
    level: 3
}, {
    question: '江戶幕府位於現在何處？',
    answer: '東京都千代田區',
    level: 2
}, {
    question: '西鄉的第一、二任藩主？後者由誰輔佐？',
    answer: '分別為島津齊彬、忠義和久光。',
    level: 4
}, {
    question: '島津久光主張？',
    answer: '公武合體',
    level: 5
}, {
    question: '西鄉在哪一場戰役是支持幕府、打長州？',
    answer: '禁門之變',
    level: 5
}, {
    question: '島津氏奉領為幾石？為何種大名？領有哪些地？',
    answer: '73萬石、外樣大名、領有薩摩、大隅和日向國。',
    level: 4
}, {
    question: '薩長同盟因為哪裡來的誰居中引介而成？',
    answer: '土佐藩的浪士坂本龍馬。',
    level: 5
}, {
    question: '坂本龍馬曾加入誰組織的什麼組織？',
    answer: '武市瑞山組織的土佐勤王黨。',
    level: 3
}, {
    question: '坂本龍馬曾組織什麼組織，以誰的名義提供誰武力？',
    answer: '龜山社中(海援隊)，以薩摩藩的名義給長州藩武器。',
    level: 4
}, {
    question: '維新三傑為？',
    answer: '木戶孝允(桂小五郎)、西鄉隆盛和大久保利通。',
    level: 5
}, {
    question: '新政府軍和幕府勢力間的戰爭統稱為？',
    answer: '戊辰戰爭',
    level: 5
}, {
    question: '戊辰戰爭的東征大將軍為？',
    answer: '有栖川宮熾仁親王',
    level: 4
}, {
    question: '戊辰戰爭西鄉的識位為？',
    answer: '東征大將軍的參謀。',
    level: 4
}, {
    question: '西鄉和誰位於哪裡會談，達成無血開城？',
    answer: '和勝海舟會於江戶品川。',
    level: 5
}, {
    question: '勝海舟任新政府何職？',
    answer: '海軍卿',
    level: 3
}, {
    question: '勝海舟任新政府何職？',
    answer: '海軍卿',
    level: 3
}, {
    question: '明治時西鄉接受誰的建議，以哪些藩的兵共同組成什麼？',
    answer: '山縣有朋建議以蕯摩、長州和土佐兵共同組成御親兵。',
    level: 4
}, {
    question: '明治政府派遣誰赴歐美考察？',
    answer: '岩倉具視',
    level: 4
}, {
    question: '西鄉為日本官拜哪兩個職位的第一人？',
    answer: '陸軍大將、陸軍元帥',
    level: 3
}, {
    question: '山縣有朋曾做了哪些事？當了哪些職務？有哪些稱號？',
    answer: `建請西鄉成立御親兵、實施徵兵制並推行陸軍現代化。
當了陸軍卿、參謀部長，有國軍之父、軍閥之祖之稱。`,
    level: 3
}, {
    question: '明治4年赴歐美考察的人有？',
    answer: `大久保利通、伊藤博文、岩倉具視、山口尚芳和木戶孝允。`,
    level: 3
}, {
    question: '西鄉提出了什麼，卻因岩倉返國後反對，最後被迫下野，史稱何事件？',
    answer: '征韓論、明治六年政變。',
    level: 3
}, {
    question: '西南戰征中，西鄉軍首先從何處北上包圍何城，和誰率領的何軍戰？',
    answer: '自鹿耳島北上打熊本城、和熊本鎮臺司令谷干城率領的鎮臺軍。',
    level: 3
}, {
    question: '政府軍和西鄉軍戰於何處？西鄉軍中誰死於此役？',
    answer: '田原坂、篠原國幹。',
    level: 3
}, {
    question: '田原坂之戰中政府軍小隊長幾名中死了幾名？',
    answer: '11/30',
    level: 3
}, {
    question: '田原坂之戰中政府軍因徵兵軍無法抵抗白刃攻擊、組了？',
    answer: '警視拔刀隊',
    level: 3
}, {
    question: '西南戰征時熾仁親王被任命為何？',
    answer: '鹿兒島縣逆徒征討總督',
    level: 3
}, {
    question: '日軍第一任參謀為？',
    answer: '有栖川宮熾仁親王。',
    level: 3
}, {
    question: '西南戰征中第14聯隊長為？曾任何職？',
    answer: '乃木希典、曾任第三任臺灣總督。',
    level: 3
}, {
    question: '西南戰征中熊本鎮臺司令、參謀長、參謀、第13聯隊第3隊長和第14聯隊長分別為？',
    answer: '谷干城、樺山資紀、兒玉源太郎、小川又次和乃木希典。',
    level: 3
}, {
    question: '誰在西南戰爭中左手受傷？任何職？',
    answer: '陸軍長州閥的寺內正毅。',
    level: 3
}, {
    question: '當時任何職的哪兩個人是日俄戰征兩大功臣？',
    answer: '陸軍大臣寺內正毅和滿洲軍總參謀兒玉源太郎',
    level: 3
}, {
    question: '拔刀隊軍歌由誰寫成？後由誰譜曲後變成哪一首歌？',
    answer: '外山正一、後由 Charles Leroux 譜曲變成分列進行曲。',
    level: 3
}, {
    question: '西鄉最後由誰介錯？',
    answer: '別府晉介。',
    level: 3
}, {
    question: '大久保被誰暗殺？當時他任何職？',
    answer: '島田一郎，當時大久保為內務卿。',
    level: 3
}, {
    question: '明治天皇懷念當時任何職的西鄉、在哪裡校閱何種兵的情景？',
    answer: '近衛都督、在千葉縣大和田村校閱近衛兵。',
    level: 3
}, {
    question: '西鄉的紀念碑立於何處？為西南戰征的何地？',
    answer: '城山、為西南戰征的最後戰場。',
    level: 3
}, {
    question: '哪個地方為了篠原國幹改成何名？',
    answer: '大和田村、改成習志野原。',
    level: 3
}, {
    question: '誰曾反對徵兵、最後卻死於農民兵之手？',
    answer: '桐野利秋。',
    level: 3
}, {
    question: '西鄉最後被大赦、追贈為？',
    answer: '正三位。',
    level: 3
}, {
    question: '如果要鳥唱歌，織田、豐臣和德川分別會怎麼做？',
    answer: '殺、逗、等。',
    level: 3
}, {
    question: '稱大名的資格是？',
    answer: '收租一萬石以上。',
    level: 3
}, {
    question: '大名有三種，分別是？',
    answer: '親藩、譜代和外樣大名。',
    level: 3
}, {
    question: '親藩大名的兩個姓為？',
    answer: '松平、德川。',
    level: 3
}, {
    question: '御三家分別為？各為德川第幾子？',
    answer: '尾張(9)紀伊(10)水戶(11)',
    level: 3
}, {
    question: '三個幕府依序為？分別傳了幾代？',
    answer: '鎌倉(9)室町(15)江戶(15)',
    level: 3
}, {
    question: '御三卿分別為？',
    answer: '田安、一橋、清水。',
    level: 3
}, {
    question: '御三卿由誰創立？其後繼者為？',
    answer: '8代將軍吉宗、9代家重。',
    level: 3
}, {
    question: '直屬家臣、奉祿不滿一萬石，可以/不行謁見將軍的分別稱作？',
    answer: '旗本、御家人。',
    level: 3
}, {
    question: '幕府時代收租有哪些領、分別領幾石？',
    answer: '天領(400萬)、旗本領(300萬)、大名領(2250萬)、寺社領(40萬)和公家領(10萬)。',
    level: 3
}, {
    question: '大名中最重要的叫做？有幾家？',
    answer: '國持大名、18家。',
    level: 3
}, {
    question: '大名領中最重要的三家分別為？幾萬石？',
    answer: '加賀藩前田氏(102.5)，蕯摩國島津氏(73)和仙台國伊達氏(62)',
    level: 3
}, {
    question: '坂本龍馬的藩主為？',
    answer: '山內容堂',
    level: 3
}, {
    question: '重考生又稱為？這原本是不在用的詞了，這種詞叫作？',
    answer: '浪人、死語。',
    level: 3
}, {
    question: '1609 年琉球被誰征服？當時琉球又為明清藩屬、這種關係稱作？',
    answer: '蕯摩、兩屬關係。',
    level: 3
}, {
    question: '櫻花落下時像？',
    answer: '櫻吹雪',
    level: 3
}, {
    question: '江戶城是由誰建？於何時？',
    answer: '太田道灌、室町中期。',
    level: 3
}, {
    question: '電影末代武士的主角？',
    answer: '森勝元',
    level: 3
}, {
    question: '明治、大正、昭和戰前期的權力核心分別為？',
    answer: '藩閥、政黨、軍部。',
    level: 3
}, {
    question: '日本從地方分權到中央集權的三部曲？',
    answer: '1867 大政奉還、1869 版藉奉還和1871 廢藩置縣。',
    level: 3
}, {
    question: '倒幕勢力發動了什麼號令？開了什麼會議？最後要求德川如何？',
    answer: '王政復古的大號令、小御所會議、辭官納地。',
    level: 3
}, {
    question: '辭官納地、官地分別為？',
    answer: '內大臣、天領。',
    level: 3
}, {
    question: '戊臣戰征始末分別為何戰役？',
    answer: '京都南部的鳥羽伏見之戰和箱館的五稜郭之戰。',
    level: 3
}, {
    question: '戊臣戰征最後戰死的為幕府勢立的誰？',
    answer: '土方歲三',
    level: 3
}, {
    question: '幕末三舟分別為？',
    answer: '勝海舟、高橋泥舟和山岡鐵舟。',
    level: 3
}, {
    question: '西鄉打到哪裡時幕府決定求和？',
    answer: '駿府',
    level: 3
}, {
    question: '新政府和幕府分別為何國支持？',
    answer: '英、法',
    level: 3
}, {
    question: '誰首先提出徵兵制？最後由誰執行？',
    answer: '大村益次郎、山縣有朋。',
    level: 3
}, {
    question: '廢刀令後只有哪些人可以帶刀？',
    answer: '軍人、警察和高級文官。',
    level: 3
}, {
    question: '廢刀令後只有哪些人可以帶刀？',
    answer: '軍人、警察和高級文官。',
    level: 3
}, {
    question: '戊辰戰征中對抗明治天皇的同盟為？',
    answer: '奧與越列同盟',
    level: 3
}, {
    question: '北平無血開城的守城者為？',
    answer: '傅作義',
    level: 3
}];
exports.default = questions;

},{}]},{},[1]);
