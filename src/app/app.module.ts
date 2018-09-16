import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './modules/signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { SexyNavbarComponent } from './modules/sexy-navbar/sexy-navbar.component';
import { UserNavComponent } from './modules/user-nav/user-nav.component';
import { InfoTextComponent } from './modules/info-text/info-text.component';
import { MyProfileComponent } from './modules/my-profile/my-profile.component';
import { NameCasePipe } from './common/pipes/name-case.pipe';
import { TaskNoteComponent } from './modules/task-note/task-note.component';
import { FooterComponent } from './modules/footer/footer.component';
import { QuestionComponent } from './modules/question/question.component';
import { LoaderComponent } from './modules/loader/loader.component';
import { ErrorComponent } from './modules/error/error.component';
import { ProfileQuestionsComponent } from './modules/profile-questions/profile-questions.component';
import { ProfilePrivilegesComponent } from './modules/profile-privileges/profile-privileges.component';
import { ProfileDataComponent } from './modules/profile-data/profile-data.component';
import { TagBoxComponent } from './modules/tag-box/tag-box.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalLoginComponent } from './modules/modal-login/modal-login.component';
import { HttpClient } from '@angular/common/http';{}
const appRoutes: Routes = [
    {
        path: 'profile/:username',
        component: MyProfileComponent,
        children: [
            {
                path: '', redirectTo: 'profiledata', pathMatch: 'full'
            },
            {
                path: 'privileges', component: ProfilePrivilegesComponent
            },
            {
                path: 'profiledata', component: ProfileDataComponent
            },
            {
                path: 'questions', component: ProfileQuestionsComponent
            },
        ]
    },
    { path: 'question/:ques', component: QuestionComponent },
    { path: 'home', component: HomeComponent },
    { path: '', component: ModalLoginComponent },//ModalLoginComponentHomeComponent
]
import {
    SocialLoginModule,
    AuthServiceConfig,
    GoogleLoginProvider,
    FacebookLoginProvider,
} from "angular5-social-login";
import { HomepageTagsComponent } from './modules/homepage-tags/homepage-tags.component';
import { BigLoginComponent } from './modules/big-login/big-login.component';
import { EasyEditorComponent } from './modules/easy-editor/easy-editor.component';
import { CrazyBgComponent } from './common/component/crazy-bg/crazy-bg.component';
// Configs 
export function getAuthServiceConfigs() {
    let config = new AuthServiceConfig(
        [
            {
                id: FacebookLoginProvider.PROVIDER_ID,
                provider: new FacebookLoginProvider("477334162742685")
            },
            {
                id: GoogleLoginProvider.PROVIDER_ID,
                provider: new GoogleLoginProvider("634654569325-afch5upblogobff334hgf9uvvvk6b4ej.apps.googleusercontent.com")
            },
        ]
    );
    return config;
}
@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        HomeComponent,
        SignupComponent,
        SexyNavbarComponent,
        UserNavComponent,
        InfoTextComponent,
        MyProfileComponent,
        NameCasePipe,
        TaskNoteComponent,
        FooterComponent,
        QuestionComponent,
        LoaderComponent,
        ErrorComponent,
        EasyEditorComponent,
        ProfileQuestionsComponent,
        ProfilePrivilegesComponent,
        ProfileDataComponent,
        TagBoxComponent,
        ModalLoginComponent,
        HomepageTagsComponent,
        BigLoginComponent,
        CrazyBgComponent
    ],
    imports: [
        // RouterModule.forRoot(appRoutes, { enableTracing: true }),
        RouterModule.forRoot(appRoutes),
        NgbModule.forRoot(),
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        SocialLoginModule
    ],
    providers: [{
        provide: AuthServiceConfig,
        useFactory: getAuthServiceConfigs
    },],
    bootstrap: [AppComponent]
})
export class AppModule { }
