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
    question: '為了發展糖業，後藤自美國聘請{誰:新渡戶稻造}來臺，出任總督府{何職:民政部殖產局長}。\
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
    question: '新渡戶稻造曾自費赴美{何學校:約翰霍普金斯大學}，在教會\
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
單挑{何稱號:甲斐之虎}的武田信玄之對戰銅像。',
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
}, {
    question: '{誰:原敬}是日本組織第一個穩定的政黨內閣，因其不具{何:爵位}號稱{何稱號:平民宰相}',
    level: 3
}, {
    question: '前三任立憲政有會總裁分別為{誰:伊藤博文}、{誰:西園寺公望}和{誰:原敬}',
    level: 3
}, {
    question: '因{何:征韓論}下野的{誰:板垣退助}在{哪裡:銀座}成立了{什麼:愛國公黨}，\
為日本第一個民間政治結社。',
    level: 3
}, {
    question: '同為{哪裡:土佐藩}出身的{哪兩人:板垣退助、後藤象二郎}等提出了\
{何著作:撰議院設立建白書}，希望政府開設民選議會。',
    level: 3
}, {
    question: '有司專制指自{何事件:明治六年政變}後到大日本帝國憲法發布為止，\
{誰:大久保利通}成立{何機構:內務省}並擔任{何職:內務卿}，建立強勢獨裁統治，政治由\
少數所把持的局面。',
    level: 3
}, {
    question: '{誰:後藤象二郎}曾將{誰:坂本龍馬}在{何主張:船中八策}中\
關於幕府應還政朝廷的主張，透過{誰:山內容堂}向{誰:德川慶喜}建言。',
    level: 3
}, {
    question: '薩長藩閥政府在發動{何事件:明治 14 年政變}迫使{誰:大隈重信}\
下台的同時，也敦請明治天皇頒布了{什麼:國會開設的敕諭}，向人民承諾召開國會。',
    level: 3
}, {
    question: '最初的三個政黨分別為{誰:板垣退助}組成的{何黨:自由黨}，主張\
{何國:法國}的急進自由主義、{誰:大隈重信}組成的{何黨:立憲改進黨}，鼓吹{何國:英國}式的\
議會政治、{誰:福地源一郎}組成的{何黨:立憲帝政黨}。',
    level: 3
}, {
    question: '板垣退助曾和{誰:林獻堂}創立日治時期臺灣第一個政治、社會、文化性的集會結社\
{何團體:臺灣同化會}',
    level: 3
}, {
    question: '大隈的立憲改進黨後改稱{何黨:進步黨}，並和自由黨合組為{何黨:憲政黨}，\
後來組成了日本第一個政黨內閣，史稱{何名:隈板內閣}',
    level: 3
}, {
    question: '伊藤和山縣退出第一線後，代表藩閥勢力的為{誰:桂太郎}、代表政黨勢力的為\
{誰:西園寺公望}。',
    level: 3
}, {
    question: '第 2 次西園寺內閣時，因受到前一年中國發生{何事件:辛亥革命}的刺激，\
陸軍向政府提出{何要求:增設朝鮮兩個師團}，但西園寺以財政困難否決，陸相{誰:上原勇作}\
便憤而辭職，且陸軍故意不推舉繼任人選而使西園寺內閣垮臺。',
    level: 3
}, {
    question: '第 2 次西園寺內閣垮臺後{誰:桂太郎}第 3 次組閣，\
但在{誰:尾崎行雄}的領導下，「閥族打破、憲政擁護」的呼聲大起\
迫使桂內閣解散，史稱{何事件:大正政變}。',
    level: 3
}, {
    question: '堺事件中，{哪兩:箕浦猪之吉、西村左平次}等武士切腹，並依序把腸子扔向法軍。\
嚇的法軍鑑長向{誰:五代友厚}要求只切腹 11 人，{誰:橋詰愛平}等 9 人因而被改處流刑。\
{誰:森鷗外}根據此事件寫了同名小說。',
    level: 3
}, {
    question: '西園寺公望在{何戰爭:戊辰戰爭}曾立有軍功，\
曾任鼓吹自由民權運動的報刊{何報刊:東洋自由新聞}的社長。',
    level: 3
}, {
    question: '尾崎行雄有{哪兩個稱號:憲政之神、議會政治之父}的美稱，保有{哪三個:當選眾議院\
次數最多、連續服務最久、最高齡議員}等記錄。',
    level: 3
}, {
    question: '吉野作造是活躍於{何時代:大正時代}的政治學者、思想家，號{什麼:古川學人}。',
    level: 3
}, {
    question: '吉野作造在大政民主運動的努力促使了{哪兩個制度:政黨內閣制、普通選舉制}的實施。',
    level: 3
}, {
    question: '民撰議院設立建白書後 4 任署名者都是在{何事件:爭韓論}下野者，分別是\
{來自哪裡的哪四人:肥前的江藤新平、土佐的坂垣退助、土佐的後藤象二郎、肥前的副島種臣}。',
    level: 3
}, {
    question: '吉野作造大學時受{誰:小野塚喜平次}提倡的{什麼:眾民主義}薰陶，日後造出{何詞:公眾}一詞。',
    level: 3
}, {
    question: '小野塚喜平次是在{何戰爭:日俄戰爭}主張{何主張:對俄強硬}的七博士之一\
，曾任{何學校:東京帝大}總長。',
    level: 3
}, {
    question: '吉野作造曾應{誰:袁世凱}之聘赴天津，擔任{誰:克定}之家教，並任教於{何學校:法政專門學堂}。',
    level: 3
}, {
    question: '大正 5 年，吉野作造在雜誌{何雜誌:中央公論}發表長文{何著作:談憲政的本義\
(兼論遂其有終之美的方法)}，討論憲政運作、民主主義等等。',
    level: 3
}, {
    question: '大正 7 年日本發生大規模的群眾運動{何:米騷動}。因{誰:寺內正毅}\
內閣執意干涉{何事件:俄國革命}出兵{何處:西伯利亞}。其內閣垮臺後由{誰:原敬}組閣。',
    level: 3
}, {
    question: '吉野在大正 7 年組成了{何團體:黎明會}，主張普通選舉，翌年出版了{何著作:普通選舉論}。',
    level: 3
}, {
    question: '大正 7 年十餘名主婦在{何處:十二銀行}阻止米糧運往北海道，揭開了{何事件:米騷動}的序幕。',
    level: 3
}, {
    question: '關東大地震後，吉野和{哪兩人:尾佐竹猛、宮武外骨}成立了{何機構:明治文化研究會}\
。該會後編纂了{何著作:明治文化全集}。',
    level: 3
}, {
    question: '吉野作造紀念館是由其女婿{誰:齋藤素巖}製作。',
    level: 3
}, {
    question: '平塚雷鳥入成美女子英語學校，其老師是{誰:生田長江}，並參加由前者和\
{誰:森田草平}擔任講師的{何社團:閨秀文學會}。',
    level: 3
}, {
    question: '{誰:森田草平}對平塚所寫的小說{著作:愛的末日}大加讚賞，後兩人陷入不倫戀，\
最後殉情自殺未遂，但男女兩方的下場卻大不同，其中前者受{誰:夏目漱石}之薦，靠著其小說{何著作:煤煙}\
登上文壇。',
    level: 3
}, {
    question: '因發生了天和的大火，於七一家人到{何處:圓乘寺}避難，於七和{誰:生田庄之介}\
墜入了情網，最後竟為了在見一面而縱火燒屋，本來負責審判的{誰:甲斐庄}憐惜之，最後還是被處火刑而死。',
    level: 3
}, {
    question: '明治 44 年平塚為首的 5 名女性創辦了{何社團:青鞜社}，鷗外稱讚其社名取的好，\
並表示自{誰:樋口一葉}辭世後，女性作家首推{誰:與謝野晶子}，但平塚應可和他並稱。',
    level: 3
}, {
    question: '青鞜創刊號的封面插畫是由{誰:長沼智惠子}所畫，其先生為{誰:高村光太郎}，\
前者又是{誰:高村光雲}的長男。',
    level: 3
}, {
    question: '八世紀初{何時代:奈良時代}成書的{何著作:古事記}和天皇敕撰的{何著作:日本書紀}，\
為現存日本最古的兩部史書，兩書中的神話和稱{什麼:記紀神話}。',
    level: 3
}, {
    question: '古代日本人認為眾神居住的世界稱為{何處:高天原}，人類\
居住之世界為{何處:豐葦原瑞穗國(中國)}，死後的世界稱為{何處:根之堅州國或黃泉國}。',
    level: 3
}, {
    question: '古代日本神話中，眾神命{誰:伊邪那岐命}(男神)和{誰:伊邪那美命}(女神)將漂流在海上的\
大地固定。',
    level: 3
}, {
    question: '伊邪那岐命和美命第一胎生下{什麼:水蛭子}，第二胎生下{什麼:淡島}\
，最後生下{哪 8 個島:淡路島、四國、隱岐島、九州、壹岐島、對馬島、佐渡島、本州}。',
    level: 3
}, {
    question: '伊邪那岐命至黃泉國探望亡妻時被她嚇到，為消除恐懼遂至{何處:日向}\
的海域淨身，洗左眼時出現了{何神:天照大神}，洗右眼時出現了{何神:月讀尊}，洗鼻子時出現了\
{何神:須佐之男命}，這三神和稱{什麼:三貴神}。',
    level: 3
}, {
    question: '豐葦原瑞穗國和黃泉國的交界為{哪裡:黃泉比良坂}。',
    level: 3
}, {
    question: '豐葦原瑞穗國和黃泉國的交界為{哪裡:黃泉比良坂}。',
    level: 3
}, {
    question: '{誰:須佐之男命}引發了天之岩屋事件，後被眾神逐出高天原，到{哪裡:出雲}\
斬{什麼:八岐大蛇}後娶了{誰:櫛名田姬}為妻。',
    level: 3
}, {
    question: '出雲大社為供奉{誰:須佐之男命}的第 6 代子孫{誰:大國主命}之所在，\
其後聽從了{誰:天照大神}的神敕，將國土讓給了{誰:瓊瓊杵尊}，此事件即為記紀神話中的{何事件:天孫降臨}。',
    level: 3
}, {
    question: '土津神社主祀{誰:保科正之}，為江戶第 2 代將軍{誰:德川秀忠}的庶子，\
曾為{誰:保科正光}的養子。',
    level: 3
}, {
    question: '神武東征沿著瀨戶內海一路東征，於{何處:紀伊國}登陸，在大和國的土豪{誰:\
長髓彥}進行決戰時，一隻金鵄停在其弓上使得神武天皇取得最後的勝利。',
    level: 3
}, {
    question: '戊辰戰爭時，會津藩將所有的藩士分成{哪四隊:青龍、白虎、朱雀、玄武}\
以迎擊{誰:板垣退助}所率領的新政府軍。其中{哪一隊:白虎}隊以為家鄉已被攻陷，19 名少年便自殺以殉。',
    level: 3
}, {
    question: '野口英世小時候灼傷了手，久年後{誰:渡部鼎}為其治療，此事讓野口立志成為醫生。\
而此醫生的朋友牙醫{誰:血脇守之助}亦在野口習醫路上多方給予鼓勵。',
    level: 3
}, {
    question: '明治 33 年野口在{誰:北里柴三郎}的介紹下赴賓州大學擔任助教，又任職\
美國石油大王{誰:洛克斐勒}所創辦的醫學研究所。',
    level: 3
}, {
    question: '北里柴三郎留學柏林大學師事{誰:柯霍}，曾和師弟{誰:貝林}共同建立了\
破傷風桿菌的血清療法。{誰:福澤諭吉}曾幫助其成立傳染病研究所。',
    level: 3
}, {
    question: '前田利家為豐臣的五大老之一，其餘四人分別為{哪四人:德川家康、毛利輝元、\
宇喜多秀家、上杉景勝}。在關原會戰時，其長子{誰:利長}屬東軍，次子{誰:利政}屬西軍。',
    level: 3
}, {
    question: '前田家的家徽為{什麼:梅鉢}，德川家的家徽為{什麼:圓中三葉葵}。\
日本政府的代表性紋章為{什麼:五七桐花紋}，天皇家的家紋為{什麼:十六八重表菊}。',
    level: 3
}, {
    question: '東京大學的象徵之一赤門為誰{誰:前田齊泰}為迎娶{誰:德川家齊}的第 21 女{誰:溶姬}所建。',
    level: 3
}, {
    question: '八田與一的恩師為{誰:廣井勇}，有{何美稱:日本港灣工程學之父}的美譽\
曾負責{哪兩地:函館、小樽}築港的工程。',
    level: 3
}, {
    question: '東京大學的精神象徵安田講堂為戰前四大財閥之一的{誰:安田善次郎}\
所捐贈，由{誰:內田祥三}所設計。',
    level: 3
}, {
    question: '八田與一曾和{誰:狩野三郎}共同規劃桃園大圳。\
後來又完成了烏山頭水庫和嘉南大圳的設計，並獲得{誰:田健治郎}總督的支持。',
    level: 3
}, {
    question: '第 7 任臺灣總督為{誰:明石元二郎}，當時的總務長官為{誰:官下村宏}。',
    level: 3
}, {
    question: '第 8 任臺灣總督為{誰:田健治郎}，當時的首相{誰:原敬}\
命其在臺推重產米增殖事業，而農學者{誰:磯永吉}亦於日後在竹子湖成功試種{什麼:蓬萊米}。',
    level: 3
}, {
    question: '有臺灣蓬萊米之母的美稱之{誰:末永仁}，和{誰:磯永吉}一同致力於稻米改良工作。\
而蓬萊米由第 10 任臺灣總督{誰:伊澤多喜男}命名。',
    level: 3
}, {
    question: '八田與一搭乘{哪艘船:大洋丸}卻被美國潛艇擊沈而殉職，其妻{誰:外代樹}因此而殉情。',
    level: 3
}, {
    question: '長岡藩的家老次座{誰:山本義路}於長岡城為{哪兩人:山縣有朋、黑田清隆}攻下後轉會津後被俘。',
    level: 3
}, {
    question: '幕末時長岡藩的家老{誰:河井繼之助}推行打破門閥、重建財政、行法國式練兵的{何改革:慶應改革}。',
    level: 3
}, {
    question: '戊辰戰爭最激烈的{何戰爭:北越戰爭}中，河井一度奪回被新政府軍攻占的長岡城，\
二戰後著名的軍事學家{誰:石原莞爾}成以此為畢業論文的主題。',
    level: 3
}, {
    question: '北越戰爭後長岡藩被減封，當時支藩見狀不忍送來 100 俵。當時的{誰:小林虎三郎}力排眾議，\
將這 100 俵變賣成立國漢學校，最後該校培育出東京帝大總長{誰:小野塚喜平次}、解剖學者{誰:小金井良精}\
和{誰:山本五十六}。',
    level: 3
}, {
    question: '{誰:佐久間象山}為幕末著名的思想家，提倡東洋道德、西洋藝術之{何思想:和魂洋才}思想，\
作育之英才有{哪五人:河井繼之助、小林虎三郎、勝海舟、吉田松陰和坂本龍馬}等。其中\
{哪兩人:小林虎三郎、吉田松陰}並稱象門的二虎。',
    level: 3
}, {
    question: '日本海海戰時三笠號上，司令長官為{誰:東鄉平八郎}，參謀長為{誰:加藤友三郎}，\
作戰參謀謀為{誰:秋山真之}。而山本五十六搭乘的艦為{哪艘艦:日進號}。',
    level: 3
}, {
    question: '依照軍艦的分類，松島號為{何類:防護巡洋艦}，日進號為{何類:裝甲巡洋艦}，\
而三笠號為{何類:戰艦}。',
    level: 3
}, {
    question: '山本五十六在昌昭和 3 年返國後，出任輕巡{哪艘艦:五十鈴}和航母{哪艘艦:赤城}的艦長。',
    level: 3
}, {
    question: '日本的戰艦中，航空母艦以{什麼:動物}命名，戰艦以{什麼:古國}命名，巡洋艦以{什麼:山岳}命名，\
一等、二等驅逐艦則分別以{什麼:天候、氣象}和{什麼:樹木、花草}命名。',
    level: 3
}, {
    question: '二戰中日本的主力戰機為{何戰機:零式艦上戰鬥機}，係由{誰:堀越二郎}所設計。',
    level: 3
}, {
    question: '昭和 12 年山本出任海軍大臣{誰:米內先政}的海軍次官，兩人和{誰:井上成美}\
共同反對日德義軍事同盟和日美開戰，有{何稱號:海軍省的左派三羽烏}之稱。',
    level: 3
}, {
    question: '東京三大神像為{哪三人:西鄉隆盛、楠木正成和大村益次郎}。',
    level: 3
}, {
    question: '神社中用以分別陰陽世界的為{何建物:鳥居}、參拜神明的道路稱為{何建物:參道}。',
    level: 3
}, {
    question: '江戶時代五街道分別為{哪五道:東海道、中山道、日光街道、奧州街道和甲州街道}。',
    level: 3
}, {
    question: '陸海兩軍的統領，在軍政中分別為{何職:陸軍大臣}、{何職:海軍大臣}\
，在軍令中分別為{何職:參謀總長}、{何職:軍令部總長}。',
    level: 3
}, {
    question: '戰前日本軍部干政的兩大利器為{哪兩個:帷幄上奏權、軍部大臣現役武官制}。',
    level: 3
}, {
    question: '新撰組的隊長為{誰:近藤勇}，副隊長為{誰:土方歲三}。',
    level: 3
}, {
    question: '女性中戰前第一個登上日本鈔票的是{誰:神功皇后}，戰後第一個\
登上鈔票的是{誰:紫式部}，戰後第一個登上鈔票肖像的是{誰:樋口一葉}。',
    level: 3
}, {
    question: '有仙台藩祖之稱的是{誰:伊達政宗}。',
    level: 3
}, {
    question: '日本陸軍史上最大的叛亂事件是{何事件:二二六事件}。',
    level: 3
}, {
    question: '五代將軍{誰:德川綱吉}下了{何命令:憫生令}，命不得虐殺動物。',
    level: 3
}, {
    question: '源氏物語的作著是{誰:紫式部}。',
    level: 3
}, {
    question: '大石良雄發動的赤穗事件中，年紀最大的是{誰:堀部彌兵衛}，最小的是{誰:大石主稅}，\
而武藝最強的是{誰:堀部安兵衛}。',
    level: 3
}, {
    question: '大石良雄的兵學老師是{誰:山鹿素行}。',
    level: 3
}, {
    question: '日本戰前九所帝國大學分別為{哪九所:北海道、東北、東京、名古屋、京都、\
大阪、九州、京城、臺北}帝國大學。',
    level: 3
}, {
    question: '德川開府後，想要處理掉{誰:豐臣秀賴}，因此用文字獄(史稱{何事件:方廣寺鐘銘事件})發動了\
{何戰爭:大阪冬之陣}，但被{誰:真田幸村}守住。',
    level: 3
}, {
    question: '{何戰爭:大阪夏之陣}中，真田幸村打敗{誰:伊達政宗}，突破德川的本陣殺死了影武者。',
    level: 3
}, {
    question: '源賴朝傳位給他的兒子{誰:源賴家}，其母為{誰:北條政子}，但後來被{誰:北條時政}逼迫\
讓位給{誰:源實朝}。',
    level: 3
}, {
    question: '伊勢神宮每 20 年會有一次{何活動:式年遷宮祭}。',
    level: 3
}, {
    question: '七福神分別是{哪七神:弁財天、惠比壽、福祿壽、大黑天、昆門沙天、布袋、壽老人}。',
    level: 3
}, {
    question: '德川家康的本鎮總共被突破過兩次，第一次是在{何戰爭:三方原會戰}被{誰:武田信玄}給突破，\
第二次是在{何戰爭:大坂夏之陣}被{誰:真田信繁(幸村)}。',
    level: 3
}, {
    question: '日本海軍的四大戰區分別是{哪四個:橫須賀、佐世保、吳、舞鶴}',
    level: 3
}, {
    question: '天叢雲劍又名{何名稱:草薙劍}，相傳除了須佐之男命外{誰:日本武尊}也拿過。',
    level: 3
}, {
    question: '在日本農曆十月又稱為{何名稱:神無月}。',
    level: 3
}];

exports.default = questions;

},{}]},{},[1]);
