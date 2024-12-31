'use client';
import { useEffect, useMemo, useRef, useState } from "node_modules/@types/react";

import { incrementUsage } from 'app/dashboard/apis';
import { addExpense, editExpense } from 'app/dashboard/expenses/apis';
import { format } from "date-fns";
import debounce from 'debounce';
import { toast } from 'sonner';

import AutoCompleteList from 'components/autocomplete-list';
import { useUser } from 'components/context/auth-provider';
import CircleLoader from 'components/loader/circle';
import Modal from 'components/modal';
import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import { Label } from 'components/ui/label';
import { Textarea } from 'components/ui/textarea';

import { getCurrencySymbol } from 'lib/formatter';

import { expensesCategory, expensesPay, groupedExpenses } from "constants/categories";
import { dateFormat, datePattern } from "constants/date";
import messages from 'constants/messages';

interface addExpenseProps {
    show: boolean;
    selected: any;
    onHide: () => void;
    mutate: () => void;
    lookup: (value: any) => void;
}

const initialState = {
    category: 'food',
    paid_via: 'upi',
    name: '',
    notes: '',
    price: '',
    date: '',
    id: null,
    autoComplete: [],
};

export default function addExpense({ show, onHide, mutate, selected, lookup} : addExpenseProps) {
    const user = useUser();
    const todayDate = format(new Date(), dateFormat);
    const [state, setState] = useState<any>({...initialState, date: todayDate});
    const [loading, setLoading] = useState(false);
    const inputRef = useRef<any>(null);

useEffect(
    () => setState(
        selected.id
            ? { ...selected, ...{ paid_via: selected.paid_via ? selected.paid_via : initialState.paid_via}}
            : {...initialState, date: todayDate}
    ),
    [selected, todayDate]
);

const onLookup = useMemo(() => {
    const callbackHandler = (value: string) => {
        setState((prev: any) => ({ ...prev, autoComplete: lookup(value)}));
    };
    return debounce(callbackHandler, 500);
}, [lookup]);

const onSubmit = async () => {
    try {
        setLoading(true);
        const isEditing = selected?.id;
        if(isEditing) {
            await editExpense(state);
        } else {
            await addExpense(state);
            incrementUsage();
        }
        setLoading(false);
        toast.success(isEditing ? messages.updated : messages.success);
        if(mutate) mutate();
        onHide();
        setState({ ...initialState });
    } catch {
        setLoading(false);
        toast.error(messages.error);
    }
};

return(
    <Modal someRef={inputRef} show={show} title={`${selected.id ? 'Edit' : 'Add'} Expense`} onHide={onHide}>
        <div className="sm:flex sm:items-start max-sm:pb-6">
            <form 
            className="md:[420px] grid w-full grid-cols-1 items-center gap-3"
            onSubmit={(event) => {
                event.preventDefault();
                onSubmit();
                if(!selected.id) setState({ ...initialState});
            }}>
                <div className="relative">
                    <Label htmlFor="name">Name</Label>
                    <Input
                    className="mt-1.5"
                    id="name"
                    placeholder="Swiggy - Biriyani"
                    maxLength={30}
                    required
                    ref={inputRef}
                    autofocus
                    autoComplete="off"
                    onChange={({ target }) => {
                        const {value } = target;
                        if(value.length) {
                            setState({ ...state, name: '', category: 'food', paid_via: 'upi'});
                        }
                    }} 
                    value={state.name}/>

                    <AutoCompleteList 
                    onHide={() =>{
                        setState({ ...state, autocomplete: [] });
                    }}
                    data={state.autocomplete}
                    searchTerm={state.name.length > 2 ? state.name.toLowerCase() : ''}
                    onClick={({ name, category, paid_via}) => {
                        setState({ ...state, name, category, paid_via, autocomplete: [] });
                    }}
                    show={Boolean(state.autocomplete?.length)}/>
                </div>
            </form>
        </div>
    </Modal>
)
}

