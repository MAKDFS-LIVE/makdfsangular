import { Injectable } from '@angular/core';
import Web3 from 'web3';

@Injectable({
  providedIn: 'root'
})
export class Web3ServiceService {
  private web3: Web3 | null = null;
  constructor() {
    this.initializeWeb3();
  }

  private initializeWeb3() {
    if ((window as any).ethereum) {
      this.web3 = new Web3((window as any).ethereum);
      try {
        (window as any).ethereum.request({ method: 'eth_requestAccounts' });
      } catch (error) {
        console.error('User denied:', error);
      }
    } else if ((window as any).web3) {
      this.web3 = new Web3((window as any).web3.currentProvider);
    } else {
      //this.web3 = new Web3('https://mainnet.infura.io/v3/84a1643c5f2747b6b92dba4238a385e4');
      this.web3 = new Web3('https://mainnet.infura.io/v3/84a1643c5f2747b6b92dba4238a385e4');
    }
  }

  public getWeb3(): Web3 | null {
    return this.web3;
  }

  public async getAccounts(): Promise<string[]> {
    if (!this.web3) throw new Error('not initialized');
    return this.web3.eth.getAccounts();
  }
}
