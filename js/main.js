(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _questions = require('./questions');

var _questions2 = _interopRequireDefault(_questions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function random_shuffle(arr) {
    let n = arr.length;

    for (let i = n - 1; i >= 1; i--) {
        let rd = Math.floor(Math.random() * (i + 1));
        let temp = arr[rd];
        arr[rd] = arr[i];
        arr[i] = temp;
    }
}

class Machine {
    constructor() {
        this.question_html = $('#question-para');
        this.feedback_html = $('#feedback-grid');
        this.progress_bar = $('#progress-bar');
        this.text = {
            progress: $('#progress-text'),
            correct: $('#correct-text'),
            wrong: $('#wrong-text')
        };
        this.modal = {
            main: $('#modal'),
            text: $('#modal-text'),
            button: $('#modal-button')
        };

        this.question_n = _questions2.default.length;
        this.permutation = [];
        this.currentQID = null;
        this.wrong_questions = [];
        this.current_cursor = 0;
        this.correct_n = 0;
        this.state = 0;
        for (let i = 0; i < this.question_n; i++) {
            this.permutation.push(i);
        }
        this.subproblem_n = 0;
        this.subproblem_solved_n = 0;

        this.change_status();
    }

    refresh_question() {
        this.state = 0;
        this.feedback_html.hide();

        if (this.current_cursor >= this.question_n) {
            if (this.wrong_questions.length == 0) {
                this.question_html.text('End');
                this.show_modal(0, this.question_n);
                return 0;
            } else {
                let [w, n] = [this.wrong_questions.length, this.question_n];
                this.review_wrong_question();
                this.show_modal(w, n);
            }
        }

        this.currentQID = this.permutation[this.current_cursor];
        this.current_cursor += 1;
        this.question = _questions2.default[this.currentQID];
        this.generate_question_html();
        this.progress_bar.progress('increment');
        this.change_status();
    }

    generate_question_html() {
        console.log(123);
        var spans = [];
        const regex = /\{([^}]*):([^}]*)\}/g;
        var match,
            idxNow = 0;
        const str = this.question.question;
        const len = str.length;
        const pushStr = s => {
            spans.push($('<span>', { text: s }));
        };
        this.subproblem_n = this.subproblem_solved_n = 0;
        while ((match = regex.exec(str)) != null) {
            pushStr(str.substring(idxNow, match.index));
            spans.push($('<span>', {
                text: `(${ match[1] }？)`,
                'class': 'subproblem',
                click: ((c, he) => function (e) {
                    const me = $(this);
                    me.text(c);
                    me.addClass('solved');
                    he.subproblem_solved();
                    me.off('click');
                    e.preventDefault();
                })(match[2], this)
            }));
            idxNow = match.index + match[0].length;
            this.subproblem_n++;
        }

        pushStr(str.substring(idxNow));

        this.question_html.empty();
        this.question_html.append(spans);
    }

    subproblem_solved() {
        this.subproblem_solved_n++;
        if (this.subproblem_solved_n == this.subproblem_n) this.problem_end();
    }

    show_modal(wn, qn) {
        if (wn == 0) {
            this.modal.text.text('You have correctly answered all the question!');
            this.modal.button.addClass('disabled');
        } else {
            this.modal.text.text(`You have answered all the question and scored ${ qn - wn } / ${ qn }.
Continue to review the ${ wn } incorrect question`);
        }
        this.modal.main.modal('show');
    }

    review_wrong_question() {
        this.permutation = this.wrong_questions;
        this.wrong_questions = [];
        random_shuffle(this.permutation);
        this.question_n = this.permutation.length;
        this.current_cursor = 0;
        this.correct_n = 0;
    }

    problem_end() {
        this.state = 1;
        this.feedback_html.show();
    }

    change_status(correct) {
        this.text.progress.text(`${ this.current_cursor } / ${ this.question_n }`);
        this.text.correct.text(`${ this.correct_n }`);
        this.text.wrong.text(`${ this.current_cursor - this.correct_n - 1 }`);
    }

    feedback(flag) {
        this.state = 0;
        if (!flag) this.wrong_questions.push(this.currentQID);else this.correct_n += 1;
        this.refresh_question();
    }

    shuffle() {
        this.current_cursor = 0;
        random_shuffle(this.permutation);
    }

    init() {
        this.progress_bar.progress({ value: 0, total: this.question_n });
        this.shuffle();
        this.refresh_question();
        $('#correct-button').click(() => this.feedback(true));
        $('#wrong-button').click(() => this.feedback(false));
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
    question: '後藤新平的叔公為{何人:高野長英}，幕末曾著{何著作:戊戌夢物語}批判幕府\
不分青紅皂白砲擊外國船隻的失策。',
    level: 3
}, {
    question: '後藤新平曾受{誰:兒玉源太郎}重用，擔任{何職:總督府民政長官}長達 8 年 8 個月。',
    level: 3
}, {
    question: '後藤新平 8 歲時曾入儒學者{誰:武下節山}的家塾學習漢字，\
11 歲時入{何處:藩校立生館}修習經史、詩文。',
    level: 3
}, {
    question: '13 歲時的後藤和其同鄉{誰:齋藤實}一同成為{何處:膽澤縣}大參事{誰:安場保和}\
的學僕，大參事特命安排部下{誰:阿川光裕}關照後藤',
    level: 3
}, {
    question: '安場保和參加岩倉使節團後，創立{何機構:須賀川病院和醫學校}。',
    level: 3
}, {
    question: '膽澤是{何時代:平安初期}的征夷大將軍{誰:坂上田村麻呂}鎮撫蝦夷的所在。',
    level: 3
}, {
    question: '齋藤實曾任{何職:海軍大臣}，取代{誰:長谷川好道}成為朝鮮總督後\
推行穩健的文化政治，最後卒於{何事件:二二六事件}。',
    level: 3
}, {
    question: '和坂上並稱平安時代雙璧的{誰:菅原道真}，提倡{何思想:和魂漢才}，\
曾因建議{何事:廢止遣唐使}而遭左遷，最後被奉為{何神:天滿天神}，現在為{何神:學問之神}',
    level: 3
}, {
    question: '明治 15 年後藤因經營{何機構:愛知縣醫學院}有功，被{何機構:內務省衛生局}\
的第一任局長{誰:長與專齋}提拔。翌年和{誰:安場保和}的次女{誰:和子}結婚',
    level: 3
}, {
    question: '日本在甲午戰爭後成立臨時陸軍檢疫部，由陸軍次官{誰:兒玉源太郎}擔任部長\
，後藤出任{何職:事務官長}。後藤在{哪三個地點:廣島市、宇品港、似島}設立檢疫所。\
並聘請{誰:高木友枝}譫任檢疫所事務官。',
    level: 3
}, {
    question: '明治陸軍三羽烏為{哪三人:兒玉源太郎、桂太郎、川上操六}，是當時\
陸軍大臣{誰:大山巖}主導之陸軍軍制改革的中心人物。',
    level: 3
}, {
    question: '兒玉在總督任內，身兼{哪兩職:陸軍大臣、參謀本部次長}等中央要職。\
又於日俄戰爭中隨{誰:大山巖}出征{何處:滿洲}。',
    level: 3
}, {
    question: '後藤在臺灣的任期到他出任{何職:南滿洲鐵道株式會社總裁}為止，\
後來更把經驗移稙到{何處:關東州}，成立{何機構:滿鐵調查部}。',
    level: 3
}, {
    question: '對殖民地的方針，後藤主張效法{何國:英國}的{何主義:特別統治主義}，而當時的{誰:原敬}則主張\
仿效{何國:法國}的{何主義:內地延長主義}',
    level: 3
}, {
    question: '前 4 任臺灣總督分別為{誰:樺山資紀}、{誰:桂太郎}、{誰:乃木希典}和{誰:兒玉源太郎}。',
    level: 3
}, {
    question: '為了調查臺灣的風土人情，後藤成立{何機構:臨時臺灣舊慣調查會}，並聘請\
京都帝國大學的{哪三人:民法學教授岡松參太郎、行政法教授織田萬、中國史教授狩野直喜}。\
其中{何人:織田萬}所著的{何著作:清國行政法}乃研究近世中國的重要參考物。',
    level: 3
}, {
    question: '後藤從臺灣人的個性上發現三個弱點，{哪三個:怕死、愛錢、重面子}。',
    level: 3
}, {
    question: '後藤主政後，頒布{何令:匪徒刑罰令}，對各地的抗日義軍採殘酷彈壓政策。',
    level: 3
}, {
    question: '臺大醫院的前身為{何:臺灣病院，後改名為臺北病院}，當時的院長{誰:山口秀高}\
曾在院內創辦講習所。',
    level: 3
}, {
    question: '臺灣總督府醫學校前兩任校長分別為{哪兩人:山口秀高、高木友枝}。',
    level: 3
}, {
    question: '後藤曾聘請{誰:長谷川謹介}完成北起{何處:基隆}南至{何處:高雄}的縱貫鐵路',
    level: 3
}, {
    question: '後藤曾命{誰:長尾半平}擔任\
{何職:民政部土木課長}，和{誰:野村一郎}共同推重臺北市區的道路建設和都市計畫。',
    level: 3
}, {
    question: '後藤曾聘有{何美譽:臺灣自來水之父}美譽的{誰:巴爾頓}進行上下水道工程。\
在他死後其遺志由{誰:濱野彌四郎}繼承，而{誰:八田與一}又曾是前者的部屬。',
    level: 3
}, {
    question: '後藤曾成立{何機構:臨時臺灣土地調查局}以確定土地的所有權，\
以{誰:中村是公}為次長。',
    level: 3
}, {
    question: '後藤成立{何機構:臨時臺灣基隆築港局}進行基隆築港工程，\
由{誰:長尾半平}舉薦的{誰:川上浩二郎}總責。而前者又和譫任基隆築港所所長的{誰:松本虎太}同為基隆築港的恩人。',
    level: 3
}, {
    question: '為了發展糖業，後藤自美國聘請{誰:新渡戶稻造}來臺，出任{何職:總督府民政部殖產局長}。\
新渡戶寫下了{何:糖業改良意見書}，總督府採用後頒佈了{何制度:臺灣糖業獎勵規則與施行細則}，\
並成立了{何機構:臨時臺灣糖務局}主其事。',
    level: 3
}, {
    question: '後藤曾拔擢{誰:祝辰巳}為{何職:民政部主計課}，為臺灣主計制度的開創者，\
後藤並欽點他為繼任的{何職:民政長官}',
    level: 3
}, {
    question: '中村是公用{何物:公債}買收大租戶，成功解決清代一田兩主的問題。\
他後來繼任後藤成為第二任的{何職:滿鐵總裁}，曾招待其友{誰:夏目潄石}到滿洲參訪。',
    level: 3
}, {
    question: '基隆港築港兩大要角中，川上浩二郎離開臺灣後又曾負責{何工程:博多灣築港工程}，\
而松本虎太還成功開鑿{哪個運河:臺南運河}。',
    level: 3
}, {
    question: '擔任{何職:彩票局長}的{誰:宮尾舜治}曾發行臺灣史上最初的樂透彩票。',
    level: 3
}, {
    question: '後藤心腹三羽烏分別為{哪三人:中村是公、祝辰巳、宮尾舜治}，加上{誰:長尾半平}合稱四天王。',
    level: 3
}, {
    question: '{誰:乃木希典}最先對鴉片採取懷柔的方針，因此公布了{何法:臺灣鴉片令}。',
    level: 3
}, {
    question: '後藤曾將鴉片交給御用士紳{哪兩人:辜顯榮、陳中和}經營。',
    level: 3
}, {
    question: '後藤離臺後還擔任了{哪些重大職位:滿鐵首任總裁、內務大臣、鐵道院總裁、\
外務大臣、東京市長、日本童軍協會會長、東京放送局總裁}。',
    level: 3
}, {
    question: '關東大地震後，任{誰:山本權兵衛}內閣內務大臣的後藤，\
提出了{什麼:帝都復興之議}，並自兼{何機構:帝都復興院}的總裁，副總裁為{誰:宮尾舜治}。',
    level: 3
}, {
    question: '新渡戶稻造在明治 10 年入{何校:札幌農學校}讀書，當時的校長為{誰:克拉克}',
    level: 3
}, {
    question: '新渡戶稻造曾自費赴美{何學校:約翰難普金斯大學}，在教會\
認識後來成為其妻子的{誰:瑪麗·愛爾金頓}，後又以公費赴德{何學校:哈勒}大學取得\
{何學位:農業經濟學}博士學位。',
    level: 3
}, {
    question: '新渡戶稻造為幫助歐美人士更加了解日本，寫了其名著{何著作:武士道}。',
    level: 3
}, {
    question: '日本最早提到武士道為戰國時代甲州兵學之祖{誰:武田信玄}之\
家臣{誰:高坂昌信}的著書{何著作:甲陽軍鑑}。',
    level: 3
}, {
    question: '史跡公園中有{何稱號:越後之龍}的{誰:上杉謙信}\
單挑{何稱號:甲斐之虎}的{誰:武田信玄}的對戰銅像。',
    level: 3
}, {
    question: '上杉謙信和武田信玄為了爭奪{何國:信濃國}北部的控置權，\
12 年發生了 5 次的{戰爭名:川中島會戰}。但較大規模的戰鬥只有第 2 次的\
{戰爭名:犀川之戰}和第 4 次的{戰爭名:八幡原之戰}。',
    level: 3
}, {
    question: '武田信玄領導有方，智將{誰:真田信隆}和\
四天王{哪四人:高坂昌信、內藤昌豐、馬場信春和山縣昌景}均樂為驅馳。',
    level: 3
}, {
    question: '新渡戶提到武士道源於{哪三點:佛教的貴死賤生、儒教的職分倫理和神道的忠君}。',
    level: 3
}, {
    question: '能樂中的{何劇:鉢木}因充分體現武士道精神，至今仍廣受好評。\
其中的主角武士為{誰:佐野源左衛門}，他遇到的雲遊僧為{誰:北條時賴}。',
    level: 3
}, {
    question: '江戶中期赤穗藩主{誰:淺野長矩}為報仇殺傷負責指導他禮儀的\
{誰:吉良義央}後被命切腹。後原家{誰:大石良雄}為主復仇。',
    level: 3
}];

exports.default = questions;

},{}]},{},[1]);
