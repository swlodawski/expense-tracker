'use client';

import Image from "node_modules/next/image";

import { useEffect, useMemo, useRef, useState } from "node_modules/@types/react";

import { incrementUsage } from 'app/dashboard/apis';
import { addSubscription, editSubscriptions } from 'app/dashboard/subscriptions/apis';
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

import { subscriptionCategory } from "constants/categories";
import { dateFormat, datePattern } from "constants/date";
import messages from 'constants/messages';

const checkUrl = (urlString: string ) => {
    let url ;
    try {
        url = new URL(urlString);
    } catch (_) {
        return false;
    } return url.protocol === 'http:' || url.protocol === 'https:';
};

interface addSubscriptions {
    show: boolean;
    selected: any;
    onHide: () => void;
    mutate: () => void;
    lookup: (name: string) => void;
}

const initialState = {
    date: '',
    name: '',
    notes: '',
    url: '',
    price: '',
    paid: 'monthly',
};

export default function addSubscriptions({ show, onHide, mutate, selected, lookup} : addSubscriptions) {
    const user = useUser();
    const todayDate = format(new Date(), dateFormat);
    const [state, setState] = useState<any>({...initialState, date: todayDate});
    const [loading, setLoading] = useState(false);
    const [hasValidUrl, setHasValidUrl] = useState(false);
    const inputRef = useRef<any>(null);

useEffect(
    () => setState(selected.id ? selected : { ...initialState, date: todayDate}), [selected, todayDate]);
useEffect(
    () => setHasValidUrl(checkUrl(state.url)), [state.url]);

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
            await editSubscriptions(state);
        } else {
            await addSubscription(state);
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
    <Modal someRef={inputRef} show={show} title={`${selected.id ? 'Edit' : 'Add'} Subscriptions`} onHide={onHide}>
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
                    placeholder="Netflix or Amazon Prime"
                    maxLength={30}
                    required
                    ref={inputRef}
                    autofocus
                    autoComplete="off"
                    onChange={({ target }) => {
                        const { value } = target;
                        if(value.length) {
                            setState({ ...setState, name: value });
                            if ( value.length > 2) onLookup(value);
                        } else {
                            setState({ ...state, name: '', paid: 'monthly' });
                        }
                    }} 
                    value={state.name}/>
                    <AutoCompleteList 
                    onHide={() =>{
                        setState({ ...state, autocomplete: [] });
                    }}
                    data={state.autocomplete}
                    searchTerm={state.name.length > 2 ? state.name.toLowerCase() : ''}
                    onClick={({ name, paid, url }) => {
                        setState({ ...state, name, paid, url, autocomplete: [] });
                    }}
                    show={Boolean(state.autocomplete?.length)}/>
                </div>
                <div className="grid grid-cols-[100%] gap-1">
                        <Label className="flex grow-0 items-center" htmlFor="website">Website
                            {hasValidUrl && state.url ? (
                                <Image 
                                src={`http://www.google.com/s2/favicons?domain=${state.url}&sz=125`}
                                width={15}
                                height={15}
                                alt={state?.name}
                                className="ml-2"/>
                            ) : null}
                        </Label>
                        <Input
                        className="mt-1.5"
                        id="website"
                        type="url"
                        inputMode="url"
                        pattern="https://.*|http://.*"
                        maxLength={30}
                        placeholder="https://netflix.com"
                        required
                        onChange={(event) => setState({ ...state, url: event.target.value})}
                        value={state.url} />
                </div>
                <div className="grid grid-cols-[34%,36%,30%] gap-1">
                    <div className="mr-3">
                        <span className="">
                            ({getCurrencySymbol(user.currency, user.locale)})
                        </span>
                        <Label htmlFor="price">Price</Label>
                        <Input
                        className="mt-1.5"
                        id="price"
                        type="number"
                        inputMode="decimal"
                        placeholder="699"
                        required
                        min="0"
                        step="any"
                        onChange={(event) => {setState({ ...state, price: event.target.value})}}
                        value={state.price}
                         />
                    </div>
                    <div className="mr-3">
                        <Label htmlFor="date">Bought Date</Label>
                        <Input
                        className="mt-1.5 appearance-none"
                        id="date"
                        type="date"
                        required
                        max={todayDate}
                        pattern={datePattern}
                        onChange={(event) => {
                            setState({ ...state, date: event.target.value});
                        }}
                        value={state.date} />
                    </div>
                    <div className="mr-3">
                        <Label htmlFor="paying">Paying</Label>
                        <select 
                        id="paying" 
                        className="mt-1.5 flex h-9 max-sm:h-10 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        onChange={(event) => {
                            setState({ ...state, paid: event.target.value});
                        }}
                        value={state.paid}
                        required>
                                        {Object.keys(subscriptionCategory).map((key) => {
                                            return (
                                                <option key={key} value={key}>
                                                    {subscriptionCategory[key].name}
                                                </option>
                                            );
                                        })}
                        </select>
                    </div>
                    </div>
                   <div>
                    <Label className=" mt-1 block">
                        Notes <span className="text-center text-sm text-muted-foreground">(optional)</span>
                        </Label>
                        <Textarea 
                        className="mt-2 h-20" 
                        onChange={(event) => setState({ ...state, notes: event.target.value})}
                        value={state.notes}
                        maxLength={60} />
                        </div> 
        
                <Button  disabled={loading} className="mt-1.5" type="submit">
                    {loading ? <CircleLoader /> : `${selected?.id ? 'Update' : 'Submit'}`}
                        </Button>
                </form>
            </div>
        </Modal>
    );
}

