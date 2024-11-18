import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './commen/login/login.component';
import { ProfileComponent } from './commen/profile/profile.component';
import { QrProfileComponent } from './commen/qr-profile/qr-profile.component';
import { NotAvailableComponent } from './commen/not-available/not-available.component';
import { ReferComponent } from './commen/refer/refer.component';
import { LockedComponent } from './wallets/locked/locked.component';
import { OpenComponent } from './wallets/open/open.component';
import { LoanComponent } from './wallets/loan/loan.component';
import { OtherPlatformComponent } from './wallets/other-platform/other-platform.component';
import { MyFundsComponent } from './wallets/my-funds/my-funds.component';
import { AddFundsComponent } from './wallets/add-funds/add-funds.component';
import { PayDetailsComponent } from './wallets/pay-details/pay-details.component';
import { PayConformComponent } from './wallets/pay-conform/pay-conform.component';
import { FinalConformationComponent } from './wallets/final-conformation/final-conformation.component';
import { TransactionComponent } from './wallets/transaction/transaction.component';
import { MakWalletComponent } from './wallets/mak-wallet/mak-wallet.component';
import { P2pAccountsComponent } from './p2p/p2p-accounts/p2p-accounts.component';
import { P2pTradingComponent } from './p2p/p2p-trading/p2p-trading.component';
import { AddAccountComponent } from './p2p/add-account/add-account.component';
import { ConformationComponent } from './p2p/conformation/conformation.component';
import { BuyComponent } from './buy-crypto/buy/buy.component';
import { LoanHomeComponent } from './loan/loan-home/loan-home.component';
import { LoanMainComponent } from './loan/loan-main/loan-main.component';
import { DetailsComponent } from './loan/details/details.component';
import { InvestmentHomeComponent } from './investment/investment-home/investment-home.component';
import { InvestmentDetailsComponent } from './investment/investment-details/investment-details.component';
import { SaveimageComponent } from './commen/saveimage/saveimage.component';
import { SearchCoinComponent } from './commen/search-coin/search-coin.component';
import { AppLoginComponent } from './commen/app-login/app-login.component';
import { SignupComponent } from './commen/signup/signup.component';
import { MemberComponent } from './commen/member/member.component';
import { ReferralComponent } from './wallets/referral/referral.component';
import { HelpComponent } from './commen/help/help.component';
import { UpgradeComponent } from './commen/upgrade/upgrade.component';
import { InvestrefferComponent } from './commen/investreffer/investreffer.component';
import { ConvertComponent } from './commen/convert/convert.component';
import { ExportComponent } from './wallets/export/export.component';
import { PendingComponent } from './wallets/pending/pending.component';
import { BlogComponent } from './commen/blog/blog.component';
import { BlogHomeComponent } from './commen/blog-home/blog-home.component';
import { StreetHomeComponent } from './treder-street/street-home/street-home.component';
import { SoonComponent } from './commen/soon/soon.component';
import { LoanempatyComponent } from './commen/loanempaty/loanempaty.component';
import { PendingProfileComponent } from './commen/pending-profile/pending-profile.component';
import { OrderComponent } from './wallets/order/order.component';
import { PaymentDetailsComponent } from './buy-crypto/payment-details/payment-details.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"home/:user",component:AppLoginComponent},
  {path:"refure",component:LoginComponent},
  {path:"refure/:refure",component:LoginComponent},
  {path:"profile",component:ProfileComponent},
  {path:"qr-wallet",component:QrProfileComponent},
  {path:"not-available",component:NotAvailableComponent},
  {path:"refer",component:ReferComponent},
  {path:"signup",component:SignupComponent},
  {path:"search-coin",component:SearchCoinComponent},
  {path:"saveimage",component:SaveimageComponent},
  {path:"member",component:MemberComponent},
  {path:"help",component:HelpComponent},
  {path:"upgrade",component:UpgradeComponent},
  {path:"investreffer",component:InvestrefferComponent},
  {path:"convert",component:ConvertComponent},
  {path:"blog",component:BlogComponent},
  {path:"blog/:url",component:BlogHomeComponent},
  {path:"treder-street",component:StreetHomeComponent},
  {path:"soon",component:SoonComponent},
  {path:"loanempaty",component:LoanempatyComponent},
  {path:"pending",component:PendingProfileComponent},
  {path:"payment-details",component:PaymentDetailsComponent},
  {
    path:"wallet",children:[
      {path:"locked",component:LockedComponent},
      {path:"open",component:OpenComponent},
      {path:"loan",component:LoanComponent},
      {path:"other-platform",component:OtherPlatformComponent},
      {path:"my-funds",component:MyFundsComponent},
      {path:"add-funds",component:AddFundsComponent},
      {path:"pay-details",component:PayDetailsComponent},
      {path:"pay-conform",component:PayConformComponent},
      {path:"final-conformation",component:FinalConformationComponent},
      {path:"transaction",component:TransactionComponent},
      {path:"mak-wallet",component:MakWalletComponent},
      {path:"referral",component:ReferralComponent},
      {path:"export",component:ExportComponent},
      {path:"pending",component:PendingComponent},
      {path:"order",component:OrderComponent}
    ]
  },
  {
    path:"p2p",children:[
      {path:"account",component:P2pAccountsComponent},
      {path:"trading",component:P2pTradingComponent},
      {path:"add-account",component:AddAccountComponent},
      {path:"conformation",component:ConformationComponent}
    ]
  },
  {
    path:"buy",children:[
      {path:"crypto",component:BuyComponent}
    ]
  },
  {
    path:"loan",children:[
      {path:"home",component:LoanHomeComponent},
      {path:"main",component:LoanMainComponent},
      {path:"details",component:DetailsComponent}
    ]
  },
  {
    path:"investment",children:[
      {path:"home",component:InvestmentHomeComponent},
      {path:"details",component:InvestmentDetailsComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
