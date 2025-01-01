'use client'

import { useEffect, useState } from "node_modules/@types/react";

import { PlusIcon } from 'lucide-react';
import { useHotKeys } from 'react-hotkeys-hook';

import { Tooltip, ToolTipContent, ToolTipTrigger } from 'components/ui/tooltip';

import shortcuts from "constants/shortcuts";

import addExpense from "./add/expenses";
import AddIncome from "./add/income";
import AddInvestment from "./add/investments";
import addSubscriptions from "./add/subscriptions";

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

