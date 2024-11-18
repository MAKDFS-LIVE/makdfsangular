import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrgnigationService } from './service/orgnigation.service';
import { HomeComponent } from './home/home.component';
import { AddFundsComponent } from './wallets/add-funds/add-funds.component';
import { LoanComponent } from './wallets/loan/loan.component';
import { LockedComponent } from './wallets/locked/locked.component';
import { MyFundsComponent } from './wallets/my-funds/my-funds.component';
import { OpenComponent } from './wallets/open/open.component';
import { PayDetailsComponent } from './wallets/pay-details/pay-details.component';
import { PayConformComponent } from './wallets/pay-conform/pay-conform.component';
import { P2pAccountsComponent } from './p2p/p2p-accounts/p2p-accounts.component';
import { P2pTradingComponent } from './p2p/p2p-trading/p2p-trading.component';
import { AddAccountComponent } from './p2p/add-account/add-account.component';
import { FinalConformationComponent } from './wallets/final-conformation/final-conformation.component';
import { ConformationComponent } from './p2p/conformation/conformation.component';
import { OtherPlatformComponent } from './wallets/other-platform/other-platform.component';
import { ProfileComponent } from './commen/profile/profile.component';
import { BuyComponent } from './buy-crypto/buy/buy.component';
import { LoginComponent } from './commen/login/login.component';
import { NotAvailableComponent } from './commen/not-available/not-available.component';
import { QrProfileComponent } from './commen/qr-profile/qr-profile.component';
import { ReferComponent } from './commen/refer/refer.component';
import { InvestmentDetailsComponent } from './investment/investment-details/investment-details.component';
import { InvestmentHomeComponent } from './investment/investment-home/investment-home.component';
import { DetailsComponent } from './loan/details/details.component';
import { LoanHomeComponent } from './loan/loan-home/loan-home.component';
import { LoanMainComponent } from './loan/loan-main/loan-main.component';
import { MakWalletComponent } from './wallets/mak-wallet/mak-wallet.component';
import { TransactionComponent } from './wallets/transaction/transaction.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { QRCodeModule } from 'angularx-qrcode';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { NgxCaptchaModule } from 'ngx-captcha';
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
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { ExportComponent } from './wallets/export/export.component';
import { IgxFinancialChartModule, IgxLegendModule } from "igniteui-angular-charts";
import { PendingComponent } from './wallets/pending/pending.component';
import { BlogComponent } from './commen/blog/blog.component';
import { BlogHomeComponent } from './commen/blog-home/blog-home.component';
import { StreetHomeComponent } from './treder-street/street-home/street-home.component';
import { SoonComponent } from './commen/soon/soon.component';
import { LoanempatyComponent } from './commen/loanempaty/loanempaty.component';
import { PendingProfileComponent } from './commen/pending-profile/pending-profile.component';
import { OrderComponent } from './wallets/order/order.component';
import { PaymentDetailsComponent } from './buy-crypto/payment-details/payment-details.component';
import { SocialLoginModule, SocialAuthServiceConfig, GoogleSigninButtonModule, GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { RouterModule } from '@angular/router';
import { Web3ServiceService } from './service/web3-service.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddFundsComponent,
    LoanComponent,
    LockedComponent,
    MyFundsComponent,
    OpenComponent,
    PayDetailsComponent,
    PayConformComponent,
    P2pAccountsComponent,
    P2pTradingComponent,
    AddAccountComponent,
    FinalConformationComponent,
    ConformationComponent,
    OtherPlatformComponent,
    ProfileComponent,
    BuyComponent,
    TransactionComponent,
    QrProfileComponent,
    LoanHomeComponent,
    DetailsComponent,
    InvestmentHomeComponent,
    InvestmentDetailsComponent,
    LoanMainComponent,
    NotAvailableComponent,
    ReferComponent,
    MakWalletComponent,
    LoginComponent,
    SaveimageComponent,
    SearchCoinComponent,
    AppLoginComponent,
    SignupComponent,
    MemberComponent,
    ReferralComponent,
    HelpComponent,
    UpgradeComponent,
    InvestrefferComponent,
    ConvertComponent,
    ExportComponent,
    PendingComponent,
    BlogComponent,
    BlogHomeComponent,
    StreetHomeComponent,
    SoonComponent,
    LoanempatyComponent,
    PendingProfileComponent,
    OrderComponent,
    PaymentDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CarouselModule,
    BrowserAnimationsModule,
    QRCodeModule,
    NgxCaptchaModule,
    CanvasJSAngularChartsModule,
    IgxFinancialChartModule,
    IgxLegendModule,
    SocialLoginModule,
    GoogleSigninButtonModule,
    RouterModule
  ],
  providers: [
    OrgnigationService,Web3ServiceService,
    provideHttpClient(withFetch()),
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        lang: 'en',
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '206509989909-ahs8u8gpqmhkvrci3r8evnc1lqjc9ldt.apps.googleusercontent.com'
            )
          }
        ],
        onError: (err: any) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
