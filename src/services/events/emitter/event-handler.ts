import { Event } from '../../../models/events/event';

export type EventHandler = (event: Event) => void;
