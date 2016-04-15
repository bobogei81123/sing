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
        this.answer_html = $('#answer-para');
        this.submit_html = $('#submit-grid');
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

        this.change_status();
    }

    refresh_question() {
        this.state = 0;
        this.submit_html.show();
        this.feedback_html.hide();

        if (this.current_cursor >= this.question_n) {
            if (this.wrong_questions.length == 0) {
                this.question_html.text('End');
                this.answer_html.text('');
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
        this.question_html.text(this.question.question);
        this.answer_html.text('');
        this.progress_bar.progress('increment');
        this.change_status();
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

    show_answer() {
        this.state = 1;
        this.feedback_html.show();
        this.submit_html.hide();
        this.answer_html.text(this.question.answer);
    }

    submit() {
        this.state = 1;
        this.show_answer();
    }

    change_status(correct) {
        this.text.progress.text(`${ this.current_cursor } / ${ this.question_n }`);
        console.log(this.current_cursor);
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
        $('#send-button').click(() => this.submit());
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
    question: '明治時西鄉接受誰的建議，以哪些藩的兵共同組成什麼？',
    answer: '山縣有朋建議以蕯摩、長州和土佐兵共同組成御親兵。',
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
    question: '戊辰戰征中對抗明治天皇的同盟為？',
    answer: '奧與越列同盟',
    level: 3
}, {
    question: '北平無血開城的守城者為？',
    answer: '傅作義',
    level: 3
}, {
    question: '伊藤博文出生於？其父為？',
    answer: '周防國熊毛郡，林十藏。',
    level: 3
}, {
    question: '伊藤博文號？',
    answer: '春畝、滄浪閣主。',
    level: 3
}, {
    question: '亞洲第一部成文憲法出於何處？',
    answer: '鄂圖曼帝國。',
    level: 3
}, {
    question: '伊藤曾任哪些要職？',
    answer: '首相、樞密院議長、貴族院議長。',
    level: 3
}, {
    question: '伊藤曾入哪個藩何人的私塾？',
    answer: '長州藩的吉田松陰。',
    level: 3
}, {
    question: '松下村塾位於何處？',
    answer: '萩城。',
    level: 3
}, {
    question: '萩為哪個大名的城下町？此大名領有哪些地？',
    answer: '毛利氏 37 萬。領有周防、長門國。',
    level: 3
}, {
    question: '木戶孝允曾為誰的學生？在何處？',
    answer: '吉田松陰、藩校明倫館。',
    level: 3
}, {
    question: '吉田松陰繼承誰的松下村塾？',
    answer: '叔父玉木文之進。',
    level: 3
}, {
    question: '吉田松陰除了武士外亦接受哪些人成為學生？宣揚何種理念？',
    answer: '百姓(農民)和町人(工商)。宣揚尊王倒幕。',
    level: 3
}, {
    question: '何處收藏吉田松陰的塑像？',
    answer: '東京都大學。',
    level: 3
}, {
    question: '哪個天皇為首的朝廷主張攘夷，最後哪個州最先響應，史稱何事件？',
    answer: '孝明天皇、長州、長州藩外國船砲擊事件。',
    level: 3
}, {
    question: '誰在砲擊事件後為防衛下關，設立了何組織，開了什麼先例？',
    answer: '高杉晉作、設立了奇兵隊，開了農工商百姓參軍的先例。',
    level: 3
}, {
    question: '和高杉晉作並稱「松下村塾雙壁」的是？他在哪一場戰役被誰擊敗？',
    answer: '久坂玄瑞、在禁門之變中被西鄉所擊敗。',
    level: 3
}, {
    question: '松下村塾培養出了哪些人才？',
    answer: '高杉晉作、久坂玄瑞、伊藤博文、山縣有朋和山田顯義。',
    level: 3
}, {
    question: '主持編纂現代法典的是？',
    answer: '山田顯義',
    level: 3
}, {
    question: '四國艦隊下關砲擊事件中的是哪四國？',
    answer: '英、法、荷、美。',
    level: 3
}, {
    question: '伊藤曾受維新三傑的誰重用？',
    answer: '木戶孝允',
    level: 3
}, {
    question: '哪四個藩最先提出版藉奉還？',
    answer: '長州、薩摩、土佐和肥前。',
    level: 3
}, {
    question: '伊藤曾和哪裡出生的哪個人聯手推動鐵路？',
    answer: '肥前國的大隈重信。',
    level: 3
}, {
    question: '伊藤受命赴歐考察憲法時，曾向哪些人請益？',
    answer: 'Gneist, Mosse, Stein.',
    level: 3
}, {
    question: '大隈創了哪一所學校？',
    answer: '早稻田大學',
    level: 3
}, {
    question: '明治 18 年日本正式廢止了哪個行政機構，設置了仿哪一國的內閣？',
    answer: '太政官、德國。',
    level: 3
}, {
    question: '伊藤命他的哪些僚屬，在哪個顧問的協助下制定憲法？',
    answer: '井上毅、伊東巳代治和金子堅太郎。顧問為 Mosse.',
    level: 3
}, {
    question: '哪一個機構負責審查憲法？',
    answer: '樞密院',
    level: 3
}, {
    question: '紀元節為何人的即位日？戰後改稱為？',
    answer: '神武天皇、建國紀念日。',
    level: 3
}, {
    question: '誰曾擔任樞密顧問官，且常和正黨內閣制唱反調？',
    answer: '伊東巳代治',
    level: 3
}, {
    question: '井上毅除了起草明治憲法外，還起草了？',
    answer: '軍人敕諭、教育敕語。',
    level: 3
}, {
    question: '誰在日俄開戰後赴美進行外交折衝，促成了誰出面調停？',
    answer: '金子堅太郎、羅斯福。',
    level: 3
}, {
    question: '憲法頒部時，任內閣總理、樞密院議長、外務大臣、海軍大臣、農工商務大臣、\
司法大臣、內務大臣、陸軍大臣、文部大臣和遞信大臣分別是誰？',
    answer: '黑田清隆、伊藤博文、大隈重信、西鄉從道、井上馨、山田顯義、松方正義、\
大山巖、森有禮和榎本武揚。',
    level: 3
}, {
    question: '現在日本天皇、皇太子、次子以及孫代中唯一的男性是？',
    answer: '今上天皇、德仁、文仁和悠仁親王。',
    level: 3
}, {
    question: '帝國議會分為？伊藤隨即就任為？',
    answer: '貴族院和眾議院、貴族院議長。',
    level: 3
}, {
    question: '伊藤在日俄戰爭後威迫何國簽訂何協約。翌月日本便於該國何處設置何機構。',
    answer: '第二次日韓協約、韓國。在首爾設立統監府。',
    level: 3
}, {
    question: '伊藤曾和誰共乘馬車前往統監府？兩人當時分別是什麼職位？',
    answer: '長谷川好道。伊藤和長谷川分別是統監和韓國駐紮司令官。',
    level: 3
}, {
    question: '伊藤約誰在哪裡會談，卻被誰刺殺？',
    answer: '俄國財政大臣 Kokovtsov 於哈爾濱會談、安重根。',
    level: 3
}, {
    question: '福澤諭吉為哪裡的誰的次男？出生於？',
    answer: '豐前國中津藩的下級武士福澤百助的次男，生於大阪。',
    level: 3
}, {
    question: '福澤諭吉的自傳為？',
    answer: '福翁自傳',
    level: 3
}, {
    question: '福澤的老師還有他老師的老師分別是誰？',
    answer: '白石照山、野本白巖。',
    level: 3
}, {
    question: '安政元年日本和美國訂了什麼條約？開放了什麼港口？',
    answer: '日美和親條約(神奈川條約)。開放下田、函館。',
    level: 3
}, {
    question: '福澤曾向誰學砲術？',
    answer: '山本物次郎',
    level: 3
}, {
    question: '福澤曾到哪裡、誰的蘭學塾讀書？',
    answer: '大阪、緒方洪庵',
    level: 3
}, {
    question: '緒方洪庵是第一位提倡什麼的人？享有什麼美譽？',
    answer: '第一位提倡接種牛痘疫苗、有日本近代醫學之父的美譽。',
    level: 3
}, {
    question: '緒方洪庵的私塾教育出了哪些人才？',
    answer: '福澤諭吉、長與專齋、橋本左內、大鳥圭介和大村益次郎。',
    level: 3
}, {
    question: '安政 6 年，福澤赴哪裡一遊，發現荷蘭語以經過時了？',
    answer: '橫濱',
    level: 3
}, {
    question: '萬延元年，為了交換什麼條約批准書，福澤做為誰的隨員，搭乘什麼軍艦？艦長為何？',
    answer: '日美修好通商條約、木村芥舟、咸臨丸、勝海舟。',
    level: 3
}, {
    question: '咸臨丸是哪一國製造？',
    answer: '荷蘭',
    level: 3
}, {
    question: '五國條約分別為哪五國？',
    answer: '美、英、法、荷、俄',
    level: 3
}, {
    question: '文久 2 年，幕府為了和五國磋商哪兩港哪兩個市的延期開埠，派使節赴歐？',
    answer: '兵庫和新潟、江戶和大阪',
    level: 3
}, {
    question: '主義、衛生、科學、演說、心理學、討論、倫理學、民法、進化、人生觀、人格、人權、經濟分別是誰譯？',
    answer: '福地櫻癡、長與專齋、西周、福澤、西周、福澤、井上哲次、津田真、加藤弘、井上、井上、津田、福澤。',
    level: 3
}, {
    question: '福澤的塾店原本位於？最後依序遷到哪裡？改名為？',
    answer: '築地鐵砲洲，遷到芝的新錢座再到三田，改名為慶應義塾。',
    level: 3
}, {
    question: '上野戰爭中，誰指揮的新政府軍和哪個隊激戰於何處？',
    answer: '大村益次郎、彰義隊、上野山。',
    level: 3
}, {
    question: '慶應慶塾大學的校訓為？',
    answer: '健筆遠勝劍。',
    level: 3
}, {
    question: '明治 5 年，福澤和誰共同出版了何著作，代來人生而平等的觀念？',
    answer: '小幡篤次郎、學問的勸說',
    level: 3
}, {
    question: '小幡篤次郎其弟為？他們曾同任幕府的什麼機構？',
    answer: '甚三郎、開成所',
    level: 3
}, {
    question: '和學問的勸說並列的著作為何？是誰寫的、誰譯的？',
    answer: '西國立志篇、Samuel Smiles、中村正直。',
    level: 3
}, {
    question: '英國式和德國式的憲法分別有哪些人支持？',
    answer: '福澤諭吉和大隈重信、伊藤博文和岩倉巨視。',
    level: 3
}, {
    question: '明治 14 年政變中，誰將官有財產廉價售給誰，而遭到誰的攻擊？',
    answer: '黑田清隆、五代友厚、大隈重信。',
    level: 3
}, {
    question: '誰在五稜郭之戰中，剃髮為誰求情？',
    answer: '黑田清隆、榎本武揚。',
    level: 3
}, {
    question: '福澤在哪個著作中比較了西洋和日本的文明？',
    answer: '文明論之概論',
    level: 3
}, {
    question: '明治 15 年，福澤在日本創立了哪個報紙？',
    answer: '時事新報',
    level: 3
}, {
    question: '福澤曾向朝鮮的哪兩個人表示辦報的重要性？',
    answer: '金玉均、朴泳孝',
    level: 3
}, {
    question: '福澤派誰去朝鮮發行了哪兩個報紙？',
    answer: '漢城旬報、漢城周報。',
    level: 3
}, {
    question: '福澤在哪一事件後在時事新報發表了什麼，指日本應放棄共興亞洲一事？',
    answer: '甲申事變、脫亞論。',
    level: 3
}, {
    question: '澀澤榮一在哪裡出生？',
    answer: '武藏國榛澤郡血洗島村。',
    level: 3
}, {
    question: '澀澤榮一的父親為？澀澤榮一雅號為？有什麼美譽？',
    answer: '市郎右衛門、青淵、日本資本主義之父。',
    level: 3
}, {
    question: '日本外史為誰所著？',
    answer: '賴山陽',
    level: 3
}, {
    question: '澀澤榮一的表哥為？其號為？',
    answer: '尾高惇忠、藍香',
    level: 3
}, {
    question: '水戶學為何處形成？雜揉了哪些學派？',
    answer: '常陸國水戶藩。國學、儒學、史學和神道。',
    level: 3
}, {
    question: '水戶藩第二代藩主為誰？設了什麼編纂什麼史書？',
    answer: '德川光圀。設彰考館編大日本史',
    level: 3
}, {
    question: '誰曾受德川光圀禮遇，提出了哪些原則來強調歷史的正統？',
    answer: '明遺臣朱舜水。尊王賤霸、大義名分。',
    level: 3
}, {
    question: '光圀曾為擁護南朝的誰而戰死的誰建立墓碑？',
    answer: '後醍醐天皇、楠木正成。',
    level: 3
}, {
    question: '供奉楠木正成的神社為？',
    answer: '湊川神社',
    level: 3
}, {
    question: '楠木正成和西鄉隆盛的銅像為何人製做？',
    answer: '高村光雲、後藤貞行',
    level: 3
}, {
    question: '德川光圀的左右護法為？',
    answer: '佐佐木助三郎、渥美格。',
    level: 3
}, {
    question: '幕府財政困窘時向商人課徵的強制性捐款叫作？',
    answer: '御用金',
    level: 3
}, {
    question: '誰曾和澀澤密謀攻打哪裡，但被誰所勸阻？',
    answer: '尾高惇忠、上野國高崎城、長七郎。',
    level: 3
}, {
    question: '高崎位於哪兩個的交叉點？此處向來由誰鎮守？',
    answer: '中山道和三國街道、譜代大名。',
    level: 3
}, {
    question: '澀澤到了哪一家當財務管理者？其主人為？',
    answer: '一橋家、德川慶喜。',
    level: 3
}, {
    question: '慶應 3 年，澀澤隨著誰到哪裡考察什麼活動？還謁見了誰？',
    answer: '昭武、法國的萬國博覽會、拿破崙三世。',
    level: 3
}, {
    question: '德川慶喜和昭武的父親為？他們兩個分別先繼承了哪一家，最後又成為？',
    answer: '齊昭。慶喜先繼承了一橋家、後為 15 代將軍。昭武先繼承清水家後成為水戶藩末代藩主。',
    level: 3
}, {
    question: '澀澤成協助誰成立法商講習所？為今日哪一個學校的前身？',
    answer: '福澤諭吉、森有禮。一橋大學。',
    level: 3
}, {
    question: '澀澤因為主張什麼，和哪些人意見不和便辭官，後來就任了什麼？',
    answer: '預算量入為出，大久保利通、大隈重信。就任第一國立銀行。',
    level: 3
}, {
    question: '澀澤曾寫下哪本日本最早討論股份公司成立宗旨的書？',
    answer: '立會略則',
    level: 3
}, {
    question: '第一國立銀行為於何處？',
    answer: '東京丸之內',
    level: 3
}, {
    question: '澀澤曾和哪些財閥合作，在哪裡建設了什麼？',
    answer: '和三井建設東京的都市計畫，以日本橋為中心，裝兜町建設為金融證券區，創立了東京證券取引所。\
和三菱將大手町建設成了一個大公司集中區。',
    level: 3
}, {
    question: '澀澤曾建設哪個地方成日本的國際櫥窗街？重建哪個地方成為企業總部確？',
    answer: '銀座、丸之內',
    level: 3
}, {
    question: '澀澤曾擴建哪兩個私鐵？',
    answer: '西武、東急',
    level: 3
}, {
    question: '澀澤曾建議哪個集團開發哪裡成為政商名流的高級住宅區？',
    answer: '東急、田園調布',
    level: 3
}, {
    question: '和澀澤互相輝映的是誰？建設了哪裡？',
    answer: '五代友厚、大阪',
    level: 3
}, {
    question: '銀座的地標為在哪兩個路交叉口的哪個名牌店？',
    answer: '中央通和晴海通、和光本店。',
    level: 3
}, {
    question: '澀澤成立了哪些慈善機構？在國際又成立了哪些團體？',
    answer: '日本紅十字會、聖路加國際病院、東京市職業介紹所。日美同志會、日俄協會、中華民國水災同情會。',
    level: 3
}, {
    question: '澀澤寫了哪些著作提倡義利合一論？',
    answer: '論語與算盤、論語講義。',
    level: 3
}, {
    question: '澀澤和平安時代的哪個學者提出的什麼理論古今呼應，提出了什麼？',
    answer: '菅原道真、和魂漢才，提出了士魂商才。',
    level: 3
}, {
    question: '飛鳥時代發生了哪一個重要的革新和戰爭？',
    answer: '大化革新和白江口之役。',
    level: 3
}, {
    question: '白江口之役中唐、日本分別支持？',
    answer: '新羅、百濟。',
    level: 3
}, {
    question: '奈良時代和平安時代分別是什麼文化？',
    answer: '唐風、國風。',
    level: 3
}, {
    question: '日本古代時代的首都分別在哪裡？',
    answer: '飛鳥藤原京、奈良平城京和平安京。',
    level: 3
}, {
    question: '平安時代中期什麼文學盛行？',
    answer: '假名文學',
    level: 3
}, {
    question: '平安時代中期為什麼樣的政治？誰掌控權力？',
    answer: '攝關政治、外戚藤原氏。',
    level: 3
}, {
    question: '平安時代後期哪兩個勢力掌控權力？這兩個勢力的頭頭分別為誰？',
    answer: '源、平武士，源賴朝和平清盛。',
    level: 3
}, {
    question: '源平兩勢力在哪一場戰爭後由誰獲勝後開府哪裡？',
    answer: '壇之埔之戰、源氏獲勝後開府鎌倉。',
    level: 3
}, {
    question: '幕府權力合法之論為？',
    answer: '大政委任論',
    level: 3
}, {
    question: '鎌倉幕府被誰推翻？',
    answer: '後醍醐天王聯合足利尊氏。',
    level: 3
}, {
    question: '南北朝分別開在哪裡',
    answer: '奈良、室町。',
    level: 3
}, {
    question: '1392 年誰篡了高麗？',
    answer: '李成桂',
    level: 3
}, {
    question: '室町時代因為什麼原因而產生了什麼亂事，開啟了戰國時代？',
    answer: '將軍繼承問題、應仁文明之亂。',
    level: 3
}, {
    question: '戰國三英傑分別為？出自名古屋的哪裡？',
    answer: '織田信長(尾張)、豐田秀吉(尾張)和德川家康(三河)',
    level: 3
}, {
    question: '織田曾打下美濃的哪裡？改名為？',
    answer: '稻葉山城、岐阜',
    level: 3
}, {
    question: '本能寺之變前織田派豐田去打哪裡的哪個勢力？',
    answer: '中國地方、毛利輝元。',
    level: 3
}, {
    question: '豐田軍知道本能寺之變後趕回哪裡？',
    answer: '山崎',
    level: 3
}, {
    question: '山崎的致高點為？當時被豐田軍的誰所占？',
    answer: '天王山、黑田官兵衛。',
    level: 3
}, {
    question: '安士城位於？',
    answer: '滋賀縣琵琶湖畔',
    level: 3
}, {
    question: '豐田本來要傳給誰？卻又生下了誰？',
    answer: '秀次、秀賴。',
    level: 3
}, {
    question: '五大老分別為？',
    answer: '德川家康、前田利家、毛利輝元、宇喜多秀家和上杉景勝。',
    level: 3
}, {
    question: '東西軍在哪裡決戰？稱為哪一場戰役？',
    answer: '美濃、關原會戰。',
    level: 3
}, {
    question: '關原會戰因為誰倒戈因此西軍敗？',
    answer: '小早川秀秋',
    level: 3
}, {
    question: '關原會戰後，毛利、宇喜和上杉從原來的哪些領地被減封為？',
    answer: '毛利：中國 10 國減為長門、周防兩國。宇喜：流放八丈島島主。上杉：會津 120 萬石減為米澤 30 萬石。',
    level: 3
}, {
    question: '森鷗外在哪裡出生？該地有什麼的美稱？西端毗鄰什麼地方？',
    answer: '石見國鹿足郡和野町出生。有山陰的小京都之美稱。山口縣萩市。',
    level: 3
}, {
    question: '森鷗的父母為？他們家世代為誰的典醫？',
    answer: '吉次靜男和森峰子。津和野藩主龜井氏 4 萬石。',
    level: 3
}, {
    question: '森鷗外本名為？別號為？',
    answer: '林太郎。千朵山房主人和觀潮樓主人。',
    level: 3
}, {
    question: '和森鷗外齊名的是？',
    answer: '夏目漱石。',
    level: 3
}, {
    question: '森鷗外 8 歲時入哪裡研讀四書五經、左國史漢？',
    answer: '藩校養老館。',
    level: 3
}, {
    question: '森鷗外 8 歲時入哪裡研讀四書五經、左國史漢？',
    answer: '藩校養老館。',
    level: 3
}, {
    question: '西周為誰的典醫之子？',
    answer: '津和野藩的典醫。',
    level: 3
}, {
    question: '西周幕末曾任哪個機構的教授？後和誰一同留學荷蘭？',
    answer: '番書調所、榎本武揚。',
    level: 3
}, {
    question: '西周返國後出任誰的政治顧問？翻譯了什麼？還擔任了哪個學校的校長？',
    answer: '德川慶喜。萬國公法。沼津兵學校。',
    level: 3
}, {
    question: '西周曾和誰組織什麼以鼓吹啟蒙思想？有什麼的美稱？',
    answer: '森有禮、福澤諭吉和中村正直。明六社。日本近代哲學之父的美稱。',
    level: 3
}, {
    question: '森鷗外 13 歲時考入了哪個學校？畢業之後進入陸軍省擔任什麼？服務於什麼醫院？',
    answer: '第一大學區醫學校。陸軍軍醫副。東京陸軍病院。',
    level: 3
}, {
    question: '森鷗外在德留學，先後於哪裡學習軍醫學？最後在哪裡邂逅了一德國女郎？',
    answer: '萊比錫、德勒斯、慕尼黑。柏林。',
    level: 3
}, {
    question: '森鷗外在德的恩師為？有什麼稱號？',
    answer: '佩騰科夫，有近代衛生學之父、環境醫學之父。',
    level: 3
}, {
    question: '森鷗外以自身留德的體驗為題材，寫了哪一本小說？',
    answer: '舞姬。',
    level: 3
}, {
    question: '森鷗外因媒妁之言，和誰的長女誰結婚？',
    answer: '赤松則良的長女登志子。',
    level: 3
}, {
    question: '日本造船之父為？',
    answer: '赤松則良。',
    level: 3
}, {
    question: '日本近代文壇上首次文學論戰為哪兩個人發起？',
    answer: '石橋忍月、森鷗外。',
    level: 3
}, {
    question: '哪裡立有舞姬像？',
    answer: '東京都文京區千駄木一丁目的鷗外舊居觀潮樓。',
    level: 3
}, {
    question: '森鷗外受到了哪個事件的衝擊，在哪一個雜誌發表了哪個小說？以什麼題材探討殉死在倫理上的兩難？',
    answer: '乃木希典夫婦為明治天皇殉死。在中央公論發表阿部一族。以江戶初期肥後國熊本細川家的殉死事件。',
    level: 3
}];

exports.default = questions;

},{}]},{},[1]);
