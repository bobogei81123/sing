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
}];
exports.default = questions;

},{}]},{},[1]);
