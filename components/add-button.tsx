'use client'

import { useEffect, useState } from "node_modules/@types/react";

import { PlusIcon } from 'lucide-react';
import { useHotKeys } from 'react-hotkeys-hook';

import { Tooltip, ToolTipContent, ToolTipTrigger } from 'components/ui/tooltip';

import shortcuts from "constants/shortcuts";

import AddExpense from "./add/expenses";
import AddIncome from "./add/income";
import AddInvestment from "./add/investments";
import AddSubscriptions from "./add/subscriptions";

const openShortcutKey = Object.values(shortcuts.modal.open.shortcut);

type TypeProps = 'expenses' | 'income' | 'investments' | 'subscriptions';

type AddProps = {
    mutate?: any;
    type?: TypeProps;
    selected?: any;
    onHide?: () => void;
    onLookup?: (name: string) => void;
};

const options = {
    keyup: true,
};

export default function Add({ mutate, type, selected = {}, onHide, onLookup}: AddProps) {
    const [shot, setShow] = useState(false);
    useHotKeys(openShortcutKey, () => setShow(true), options);

    useEffect(() => {
        if(selected?.id) {
            setShow(true);
        }
    }, [selected.id]);


return (
    <>
    <Tooltip>
        <ToolTipTrigger asChild>
            <button 
            className="z-100 fixed bottom-[20px] right-[20px] flex h-[56px] w-[56px] items-center justify-between rounded-full bg-blue-600 p-[12px] text-sm font-medium uppercase text-white shadow-lg hover:bg-blue-700 sm:h-[48px] sm:w-[48px]"
            onClick={() => {
                setShow(!show);
            }}>
        <PlusIcon className="h-12 w-12"/>
            </button>
        </ToolTipTrigger>
        <ToolTipContent className="mb-1 mr-1" hideWhenDetcached side="top">
            {shortcuts.modal.open.text}
            <kbd className="border-gray ml-[6px] inline-flex h-[19px] w-[19px] items-center justify-center rounded-[4px] border-[1px] border-gray-400 text-xs font-semibold uppercase">
                {shortcuts.modal.open.shortcut}
            </kbd>
        </ToolTipContent>
    </Tooltip>
    {type === 'expenses' ? (
        <AddExpense
        lookup={(value: string) => {
            if(onLookup) return onLookup(value);
        }}
        show={show}
        selected={selected}
        mutate={mutate}
        onHide={() => {
            if(onHide) onHide();
                setShow(false)
        }} />
    ) : null}
    {type === 'income' ? (
        <AddIncome
        lookup={(value: string) => {
            if (onLookup) return onLookup(value);
        }}
        show={show}
        selected={selected}
        mutate={mutate}
        onHide={() => {
            if(onHide) onHide();
            setShow(false);
        }} />
    ): null}
    {type === 'investments' ? (
        <AddInvestment
            lookup={(value: string) => {
                if(onLookup) return onLookup(value);
            }}
            show={show}
            selected={selected}
            mutate={mutate}
            onHide={() => {
                if(onHide) onHide();
                setShow(false);
            }} />
    ) : null}
    {type === 'subscriptions' ? (
        <AddSubscriptions
        lookup={(value: string) => {
            if(onLookup) return onLookup(value);
        }}
        show={show}
        selected={selected}
        mutate={mutate}
        onHide={() => {
            if(onHide) onHide();
            setShow(false);
        }} />
    ) : null}
    </>
    );
}