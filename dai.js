const Maker = require('@makerdao/dai');


async function start() {
	try {
		const maker = await Maker.create('test', {
			privateKey: ''
		});
		await maker.authenticate();


		//Get account and balance
		const balance = await maker.getToken('ETH').balanceOf(maker.currentAddress());
		console.log('Account: ', maker.currentAddress());
		console.log('Balance', balance.toString());

		// Open CDP, lock ETH and Draw DAI
		const cdp = await maker.openCdp();
		// const cdp = await maker.getCdp(2);
		const info = await cdp.getInfo();
		console.log('info', info);

		console.log(await cdp.lockEth(0.1));
		console.log(await cdp.drawDai(5));

		const debt = await cdp.getDebtValue();
		console.log(debt.toString());

	} catch (error) {
		console.log('error', error)
	}
}

start()
