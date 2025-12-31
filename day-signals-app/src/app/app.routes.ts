import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { BasicSignals } from './components/basic-signals/basic-signals';
import { ComputedSignals } from './components/computed-signals/computed-signals';
import { EffectDemo } from './components/effect-demo/effect-demo';
import { SignalInputs } from './components/signal-inputs/signal-inputs';
import { Comparison } from './components/comparison/comparison';
import { CounterDemo } from './components/counter-demo/counter-demo';
import { TodoList } from './components/todo-list/todo-list';
import { ShoppingCart } from './components/shopping-cart/shopping-cart';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'basic-signals', component: BasicSignals },
  { path: 'computed-signals', component: ComputedSignals },
  { path: 'effect-demo', component: EffectDemo },
  { path: 'signal-inputs', component: SignalInputs },
  { path: 'comparison', component: Comparison },
  { path: 'counter-demo', component: CounterDemo },
  { path: 'todo-list', component: TodoList },
  { path: 'shopping-cart', component: ShoppingCart },
  { path: '**', redirectTo: '' }
];
