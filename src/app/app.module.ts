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
import { MyFixedAlertComponent } from './modules/my-fixed-alert/my-fixed-alert.component';
import { InfoTextComponent } from './modules/info-text/info-text.component';
import { MyProfileComponent } from './modules/my-profile/my-profile.component';
import { NameCasePipe } from './common/pipes/name-case.pipe';
import { TaskNoteComponent } from './modules/task-note/task-note.component'; 

const appRoutes: Routes = [
    { path: 'profile/:username', component: MyProfileComponent },
    { path: 'home', component: HomeComponent },
    { path: '', component: HomeComponent },
]

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        HomeComponent,
        SignupComponent,
        SexyNavbarComponent,
        UserNavComponent,
        MyFixedAlertComponent,
        InfoTextComponent,
        MyProfileComponent,
        NameCasePipe,
        TaskNoteComponent
    ],
    imports: [
        RouterModule.forRoot(appRoutes,{enableTracing:true}),
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
