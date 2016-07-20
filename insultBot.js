var http = require('http');
var dispatcher = require('httpdispatcher');

const PORT=8080;

dispatcher.onGet("/", function(req, res) {
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.end(insult());
})

dispatcher.onGet("/api", function(req, res) {
	res.writeHead(200, {'Content-Type': 'application/json'});
	var insultObject = { "insult": insult() };
	res.end(JSON.stringify(insultObject));
})

dispatcher.onGet("/api/slack", function(req, res) {
	res.writeHead(200, {'Content-Type': 'application/json'});
	var slackInsultObject = { 
		"response_type": "in_channel",
		"text": insult()
	};
	res.end(JSON.stringify(slackInsultObject));
})

function handleRequest(request, response) {
	try {
		console.log(request.url);
		dispatcher.dispatch(request, response);
	} catch(err) {
		console.log(err);
	}
}

var server = http.createServer(handleRequest);

server.listen(process.env.PORT);

// insult logic
var insultArray1 = "artless bawdy beslubbering bootless churlish cockered clouted craven currish dankish dissembling droning errant fawning fobbing froward frothy gleeking goatish gorbellied impretinent infectious jarring loggerheaded lumpish mammering mangled mewling paunchy pribbling puking puny qualling rank reeky roguish ruttish saucy spleeny spongy surly tottering unmuzzled vain venomed villainous warped wayward weedy yeasty".split(" ");
var insultArray2 = "base-court bat-fowling beef-witted beetle-headed boil-brained clapper-clawed clay-brained common-kissing crook-pated dismal-dreaming dizzy-eyed doghearted dread-bolted earth-vexing elf-skinned fat-kidneyed fen-sucked flap-mouthed fly-bitten folly-fallen fool-born full-gorged guts-griping half-faced hasty-witted hedge-born hell-hated idle-headed ill-breeding ill-nurtured knotty-pated milk-livered motley-minded onion-eyed plume-plucked pottle-deep pox-marked reeling-ripe rough-hewn rude-growing rump-fed shard-borne sheep-biting spur-galled swag-bellied tardy-gaited tickle-brained toad-spotted unchin-snouted weather-bitten".split(" ");
var insultArray3 = "apple-john baggage barnacle bladder boar-pig bugbear bum-bailey canker-blossom clack-dish clotpole coxcomb codpiece death-token dewberry flap-dragon flax-wench flirt-gill foot-licker fustilarian giglet gudgeon haggard harpy hedge-pig horn-beast hugger-mugger joithead lewdster lout maggot-pie malt-worm mammet measle minnow miscreant moldwarp mumble-news nut-hook pigeon-egg pignut puttock pumpion ratsbane scut skainsmate strumpet varlot vassal whey-face wagtail".split(" ");

function insult() {
	var word1 = insultArray1[getRandomInt(0, insultArray1.length)];
	var word2 = insultArray2[getRandomInt(0, insultArray2.length)];
	var word3 = insultArray3[getRandomInt(0, insultArray3.length)];
	return 'Thou ' + word1 + ', ' + word2 + ' ' + word3 + '!';
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}