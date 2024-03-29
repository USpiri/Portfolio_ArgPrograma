import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SwiperModule } from "swiper/angular";
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { httpInterceptorProviders } from './services/interceptor/interceptor.service';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './components/header/header.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { EducationComponent } from './components/education/education.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { SkillsComponent } from './components/skills/skills.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { GreetingComponent } from './components/header/greeting/greeting.component';
import { ExperienceModalComponent } from './components/experience/experience-modal/experience-modal.component';
import { EducationModalComponent } from './components/education/education-modal/education-modal.component';
import { SkillsModalComponent } from './components/skills/skills-modal/skills-modal.component';
import { JobModalComponent } from './components/experience/job-modal/job-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AboutComponent,
    ContactComponent,
    EducationComponent,
    ExperienceComponent,
    FooterComponent,
    ProjectsComponent,
    SkillsComponent,
    NavbarComponent,
    GreetingComponent,
    ExperienceModalComponent,
    EducationModalComponent,
    SkillsModalComponent,
    JobModalComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    SwiperModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    httpInterceptorProviders,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
