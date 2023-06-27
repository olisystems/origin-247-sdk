import { BigNumber } from '@ethersproject/bignumber';
import { 
    EnergyTransferRequest,
    EnergyTransferRequestAttrs,
    State,
    TransferValidationStatus 
} from '../src';

class TestClass {
    constructor() {}

    performEnergyTransferComputations(): void {
        const createEtr = (attrs = {}) => {
            const etr = EnergyTransferRequest.fromAttrs({
                id: 1,
                ...EnergyTransferRequest.newAttributes({
                    buyerAddress: 'a',
                    sellerAddress: 'b',
                    transferDate: new Date(),
                    volume: '100',
                    certificateData: {
                        generatorId: '',
                        fromTime: new Date().toISOString(),
                        toTime: new Date().toISOString(),
                        metadata: null
                    }
                }),
                ...attrs
            });

            return etr;
        };

        const etr = createEtr();

        console.log(`Initial state: ${etr.toAttrs().state}`);

        etr.issuanceStarted();
        console.log(`State after issuance started: ${etr.toAttrs().state}`);

        etr.issuanceFinished(1);
        console.log(`State after issuance finished: ${etr.toAttrs().state}`);
        console.log(`Certificate ID after issuance finished: ${etr.certificateId}`);

        etr.persisted();
        console.log(`State after persisted: ${etr.toAttrs().state}`);

        etr.startValidation(['validator1', 'validator2']);
        console.log(`State after validation started: ${etr.toAttrs().state}`);

        etr.updateValidationStatus('validator1', TransferValidationStatus.Valid);
        console.log(`State after validator1 validation status updated: ${etr.toAttrs().state}`);

        etr.updateValidationStatus('validator2', TransferValidationStatus.Valid);
        console.log(`State after validator2 validation status updated: ${etr.toAttrs().state}`);

        etr.transferStarted();
        console.log(`State after transfer started: ${etr.toAttrs().state}`);

        etr.transferFinished();
        console.log(`Final state: ${etr.toAttrs().state}`);
    }

    performBigNumberComputations(): void {
        const number1 = BigNumber.from(10);
        const number2 = BigNumber.from(5);
        const sum = number1.add(number2);
        const product = number1.mul(number2);

        console.log(`Sum: ${sum.toString()}`);
        console.log(`Product: ${product.toString()}`);
    }

    claimCommands(): void {
        const claimCommands = [
            {
                certificateId: 'Your certificateId',
                claimData: {
                    beneficiary: 'Your beneficiary',
                    countryCode: 'Your country code',
                    location: 'Your location',
                    periodEndDate: 'Your period end date',
                    periodStartDate: 'Your period start date',
                    purpose: 'Your purpose'
                },
                energyValue: BigNumber.from(100).toString(),
                forAddress: 'Your wallet address'
            },
            // ... Add more claim command objects if needed
        ];

        console.log('Claim Commands:');
        console.log(claimCommands);
    }

    run(): void {
        this.performEnergyTransferComputations();
        this.performBigNumberComputations();
        this.claimCommands();
    }
}

const testClass = new TestClass();
testClass.run();
