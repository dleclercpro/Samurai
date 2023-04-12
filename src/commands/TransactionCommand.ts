import { ClientSession } from 'mongoose';
import Command from './Command';
import AppDatabase from '../databases/AppDatabase';

abstract class TransactionCommand<Argument, Response> extends Command<Argument, Response> {
    protected session?: ClientSession;

    public async execute() {
        let error;

        // Store session for eventual further processing
        this.session = await AppDatabase.startSession();

        try {
            await this.session.startTransaction();

            // Return will execute after the 'finally' block, so session
            // will be ended beforehand
            return await this.doExecute();

        } catch (err: any) {

            // In case of error, throw after handling transaction
            error = err;

        } finally {
            if (error) {
                await this.session.abortTransaction();
            } else {
                await this.session.commitTransaction();
            }

            await this.session.endSession();
        }

        throw this.handleError(error);
    }

    protected handleError(err: any) {
        return err;
    }
}

export default TransactionCommand;