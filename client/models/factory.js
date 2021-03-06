import abi from './factoryAbi';

const contractAddress = '0x9a191196407d7023a7f074e367702762264a7c23';

let contractInstance;

const init = localWeb3 => {
  if (!contractInstance) {
    contractInstance = new localWeb3.eth.Contract(abi, contractAddress);
  }

  return contractInstance;
};

export const factoryCreateToken = (localWeb3, userAccount) => (addr, stake, amount) => {
  init(localWeb3);

  return new Promise((res, rej) => {
    contractInstance.methods
      .createToken(addr, stake)
      .send({
        value: localWeb3.utils.toWei(amount.toString(), 'ether'),
        from: userAccount
      })
      .on('receipt', receipt => res(receipt))
      .on('error', error => rej(error));
  });
};

export const factoryGetTokens = localWeb3 => {
  init(localWeb3);
  return contractInstance.getPastEvents('NewToken', { fromBlock: 0, toBlock: 'latest' });
};

export const factoryGetStatuses = localWeb3 => {
  init(localWeb3);
  return contractInstance.getPastEvents('changeState', { fromBlock: 0, toBlock: 'latest' });
};

export const factoryGetSubscriber = localWeb3 => {
  init(localWeb3);
  return contractInstance.events.NewToken();
};

export const factoryStatusSubscriber = localWeb3 => {
  init(localWeb3);
  return contractInstance.events.changeState();
};
