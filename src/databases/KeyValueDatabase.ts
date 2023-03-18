import { createObserver, Listener } from '../utils/Observer';

interface AddEvent<V> {
    prevValue?: V,
    value: V,
}

interface RemoveEvent<V> {
    prevValue: V,
}



interface IKeyValueDatabase<R> {
    has(id: string): boolean;
    get(id: string): R | undefined;
    set(id: string, record: R): void;
    remove(id: string): void;

    onSet: (listener: Listener<AddEvent<R>>) => void;
    onDelete: (listener: Listener<RemoveEvent<R>>) => void;
}



export class KeyValueDatabase<R> implements IKeyValueDatabase<R> {
    protected db = new Map<string, R>();

    protected onSetObserver = createObserver<AddEvent<R>>();
    protected onDeleteObserver = createObserver<RemoveEvent<R>>();

    public has(id: string) {
        return this.db.has(id);
    }

    public get(id: string) {
        return this.db.get(id);
    }

    public set(id: string, record: R) {
        const prevRecord = this.db.get(id);

        this.db.set(id, record);

        this.onSetObserver.publish({ prevValue: prevRecord, value: record });
    }

    public remove(id: string) {
        const record = this.db.get(id);

        if (record) {
            this.db.delete(id);

            this.onDeleteObserver.publish({ prevValue: record });
        }
    }

    public onSet(listener: Listener<AddEvent<R>>) {
        return this.onSetObserver.subscribe(listener);
    }

    public onDelete(listener: Listener<RemoveEvent<R>>) {
        return this.onDeleteObserver.subscribe(listener);
    }
}