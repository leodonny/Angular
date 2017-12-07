import { NgModule } from '@angular/core';
import {
  ActionReducer,
  MetaReducer,
  StoreModule} from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';  
import { environment } from 'environments/environment';
import { storeFreeze } from 'ngrx-store-freeze';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RouterStoreModule } from './router-store.module';
import { AuthenticationStoreModule } from './authentication/authentication-store.module';
import { CoreStoreModule } from './core/core-store.module';

import { articleConfiguration } from 'app/article/configuration';
import { coreConfiguration } from 'app/core/configuration';
import { ArticleStoreModule } from 'app/article/article-store.module';

export interface AppState {}

function logger(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return function(state: AppState, action: any): AppState {
    console.log('state', state);
    console.log('action', action);
    return reducer(state, action);
  };
}
  
export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? [logger, storeFreeze]
  : [];

@NgModule({
  imports: [
    StoreModule.forRoot({}, { metaReducers }),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    RouterStoreModule,
    AuthenticationStoreModule,
    CoreStoreModule.configure([
      articleConfiguration.core,
    ...coreConfiguration.self
    ]),
    ArticleStoreModule.configure(articleConfiguration.self)
    // DBModule.provideDB(schema),
  ]
})
export class AppStoreModule { }
  

