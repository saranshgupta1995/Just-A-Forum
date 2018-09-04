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
import { ProfileQuestionsComponent } from './modules/profile-questions/profile-questions.component';
import { ProfilePrivilegesComponent } from './modules/profile-privileges/profile-privileges.component';
import { ProfileDataComponent } from './modules/profile-data/profile-data.component';
import { TagBoxComponent } from './modules/tag-box/tag-box.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalLoginComponent } from 'src/app/modules/modal-login/modal-login.component';
import { EasyEditorComponent } from './modules/easy-editor/easy-editor.component';

const appRoutes: Routes = [
    {
        path: 'profile/:username',
        component: MyProfileComponent,
        children: [
            {
                path: '', redirectTo:'profiledata', pathMatch:'full'
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
    { path: '', component: HomeComponent },
]

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        HomeComponent,
        SignupComponent,
        ModalLoginComponent,
        SexyNavbarComponent,
        UserNavComponent,
        InfoTextComponent,
        MyProfileComponent,
        NameCasePipe,
        TaskNoteComponent,
        FooterComponent,
        QuestionComponent,
        LoaderComponent,
        ProfileQuestionsComponent,
        ProfilePrivilegesComponent,
        ProfileDataComponent,
        TagBoxComponent,
        EasyEditorComponent
    ],
    imports: [
        // RouterModule.forRoot(appRoutes, { enableTracing: true }),
        RouterModule.forRoot(appRoutes),
        NgbModule.forRoot(),
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
